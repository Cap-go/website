export interface RuntimeConfig {
  public: {
    brand: string
  }
}

export function useRuntimeConfig(): RuntimeConfig {
  return {
    public: {
      brand: 'Capgo',
    },
  }
}
