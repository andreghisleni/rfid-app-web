import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      logo: {
        color: string;
      };
      text: string;
      progress: {
        green: string;
        yellow: string;
        red: string;
        orange: string;
      };
      grayscale: {
        bg: string;
        white: string;
        divider: string;

        gray: {
          light: string;
          default: string;
        };
        black: string;
      };
      slider: {
        bg: string;
        gray: string;
        black: string;
      };
      accent: {
        default: string;
        light: string;
      };
      form: {
        dark: {
          bg: string;
          text: string;
          input: {
            placeholder: string;
            text: string;
            bg: string;
            border: string;
          };
        };
        light: {
          bg: string;
          text: string;
          input: {
            placeholder: string;
            text: string;
            bg: string;
            border: string;
          };
        };
      };
    };
  }
}
