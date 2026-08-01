export class AudioController {
  private audio: HTMLAudioElement | null = null;
  private onStateChange: ((isPlaying: boolean, isLoading: boolean, error: string | null) => void) | null = null;

  constructor(onStateChange?: (isPlaying: boolean, isLoading: boolean, error: string | null) => void) {
    this.onStateChange = onStateChange || null;
  }

  public async play(primaryUrl?: string, wordText?: string): Promise<void> {
    this.stop();

    // Tier 1: Primary API MP3 URL
    if (primaryUrl) {
      try {
        await this.playAudioUrl(primaryUrl);
        return;
      } catch {
        // Suppress & fallback to Tier 2
      }
    }

    // Tier 2: Proxied Audio Endpoint
    if (wordText) {
      try {
        const proxyAudioUrl = `/api/audio?text=${encodeURIComponent(wordText)}`;
        await this.playAudioUrl(proxyAudioUrl);
        return;
      } catch {
        // Suppress & fallback to Tier 3
      }
    }

    // Tier 3: Native Web Speech API
    if (wordText && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return this.speakText(wordText);
    }

    const errorMsg = 'All audio playback sources failed.';
    this.notify(false, false, errorMsg);
    throw new Error(errorMsg);
  }

  private playAudioUrl(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.notify(false, true, null);
      this.audio = new Audio(url);

      this.audio.oncanplaythrough = () => {
        this.audio?.play()
          .then(() => {
            this.notify(true, false, null);
            resolve();
          })
          .catch(reject);
      };

      this.audio.onended = () => {
        this.notify(false, false, null);
      };

      this.audio.onerror = (e) => {
        this.audio = null;
        reject(e);
      };
    });
  }

  private speakText(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        const errorMsg = 'Speech synthesis unavailable.';
        this.notify(false, false, errorMsg);
        return reject(new Error(errorMsg));
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;

      utterance.onstart = () => {
        this.notify(true, false, null);
      };

      utterance.onend = () => {
        this.notify(false, false, null);
        resolve();
      };

      utterance.onerror = (e) => {
        this.notify(false, false, 'Speech synthesis error.');
        reject(e);
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.notify(false, false, null);
  }

  private notify(isPlaying: boolean, isLoading: boolean, error: string | null): void {
    if (this.onStateChange) {
      this.onStateChange(isPlaying, isLoading, error);
    }
  }

  public destroy(): void {
    this.stop();
    this.onStateChange = null;
  }
}