interface PaddleCheckoutSettings {
  displayMode?: "overlay" | "inline";
  theme?: "light" | "dark";
  locale?: string;
}

interface PaddleCheckoutOpenOptions {
  items: { priceId: string; quantity: number }[];
  settings?: PaddleCheckoutSettings;
}

interface PaddleEventData {
  name: string;
  data?: unknown;
}

interface PaddleInstance {
  Initialize(options: {
    token: string;
    eventCallback?: (data: PaddleEventData) => void;
  }): void;
  Checkout: {
    open(options: PaddleCheckoutOpenOptions): void;
  };
}

interface Window {
  Paddle: PaddleInstance;
}
