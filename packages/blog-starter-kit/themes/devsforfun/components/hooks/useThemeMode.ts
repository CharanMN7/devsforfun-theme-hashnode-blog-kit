import { useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void, () => void] {
	const [mode, setMode] = useState<ThemeMode>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme-mode');
			if (stored === 'dark' || stored === 'light') return stored;
			// Fallback to system preference
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
		}
		return 'light';
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const html = document.documentElement;
		if (mode === 'dark') {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
		localStorage.setItem('theme-mode', mode);
	}, [mode]);

	// Toggle function
	const toggle = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return [mode, setMode, toggle];
}
