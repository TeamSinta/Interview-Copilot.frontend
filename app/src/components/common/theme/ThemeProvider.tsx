import { createContext, useContext, useEffect, useState } from 'react';

// type Theme = 'dark' | 'light' | 'system' | 'theme-red';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  ORANGE = 'orange',
  PRIMARY = 'primary',
  SYSTEM = 'system',
}

const themeObj = {
  DARK: Theme.DARK,
  LIGHT: Theme.LIGHT,
};

const themeColorObj = {
  PRIMARY: {
    value: Theme.PRIMARY,
    color: 'hsl(241 84% 66%)',
  },
  ORANGE: {
    value: Theme.ORANGE,
    color: 'hsl(20.5 90.2% 48.2%)',
  },
};

enum ThemeDialog {
  OPEN = 'open',
  CLOSE = 'close',
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultThemeColor?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: Theme.SYSTEM,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [themeColor, setThemeColor] = useState<Theme>(
    () => (localStorage.getItem('theme-color') as Theme) || Theme.PRIMARY
  );
  const [showDialog, setShowDialog] = useState<ThemeDialog>(ThemeDialog.CLOSE);

  const selectedTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setTheme(theme);
  };

  const selectedThemeColor = (themeColor: Theme) => {
    localStorage.setItem('theme-color', themeColor);
    setThemeColor(themeColor);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(Theme.LIGHT, Theme.DARK, Theme.PRIMARY, Theme.ORANGE);

    Object.values(Theme).forEach((themeValue) => {
      if (root.classList.contains(themeValue)) {
        root.classList.remove(themeValue);
      }
    });

    if (theme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? Theme.DARK
        : Theme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
    if (themeColor !== Theme.PRIMARY) {
      root.classList.add(themeColor);
    }
  }, [theme, themeColor]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {showDialog === ThemeDialog.OPEN ? (
        <div
          data-status={showDialog}
          className="w-[340px] rounded-[0.5rem] absolute flex flex-col gap-[15px] bottom-[60px] right-2.5 p-[20px]  shadow-md border w-[340px]  z-40 bg-background data-[status=open]:animate-in data-[status=close]:animate-out data-[status=closed]:fade-out-0 data-[status=open]:fade-in-0"
        >
          <div className="flex flex-col gap-[5px]">
            <div>THEME</div>
            <div className="flex gap-[10px]">
              {Object.entries(themeObj).map(([key, value]) => (
                <button
                  className="py-[2px] px-[8px] border border-foreground rounded"
                  onClick={() => {
                    selectedTheme(value);
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[5px]">
            <div>COLOR</div>
            <div className="flex gap-[10px]">
              {Object.entries(themeColorObj).map(([key, value]) => (
                <div
                  onClick={() => {
                    selectedThemeColor(value.value);
                  }}
                  className="flex gap-[2px] items-center border-solid border border-border rounded py-[2px] px-[8px]"
                >
                  <div
                    className="rounded-full w-[30px] h-[30px] text-foreground"
                    style={{ background: value.color }}
                  ></div>
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {/*
      <button
        onClick={() => {
          setShowDialog(
            showDialog === ThemeDialog.OPEN
              ? ThemeDialog.CLOSE
              : ThemeDialog.OPEN
          );
        }}
        className="absolute bottom-2.5 right-2.5 rounded border p-[5px] border-foreground"
      >
        Customize
      </button> */}
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
