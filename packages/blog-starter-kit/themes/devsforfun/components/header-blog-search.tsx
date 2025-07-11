/* eslint-disable no-nested-ternary */
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

import CommonHeaderIconBtn from './common-header-icon-btn';
import { PublicationFragment } from '../generated/graphql';
import SearchSVG from './icons/svgs/SearchSvg';

const PublicationSearch = dynamic(() => import('./publication-search'), { ssr: false });

interface Props {
  publication: Pick<PublicationFragment, 'id' | 'title' | 'url' | 'isTeam' | 'favicon' | 'links' | 'author' | 'preferences'>
}

const HeaderBlogSearch = (props: Props) => {
  const { publication } = props;

  const [isSearchUIVisible, toggleSearchUIState] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Prefer userAgentData if available (modern browsers)
    setIsMac(navigator.userAgent.toLowerCase().includes('mac'));

    // Keyboard shortcut handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        toggleSearchUIState(true);
        // Focus the search input if possible (optional, handled in PublicationSearch)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac]);

  const toggleSearchUI = () => {
    toggleSearchUIState(!isSearchUIVisible);
  };

  return (
    <>
      {isSearchUIVisible ? (
        <PublicationSearch publication={publication} toggleSearchUI={toggleSearchUI} triggerRef={triggerRef} />
      ) : null}
      <CommonHeaderIconBtn
        handleClick={toggleSearchUI}
        variant="search"
        btnRef={triggerRef}
      >
        <span className="flex items-center">
          <SearchSVG className="h-6 w-6 stroke-current" />
          {/* Desktop only shortcut indicator */}
          <span className="ml-2 hidden select-none items-center rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-600 dark:bg-slate-800 dark:text-slate-300 md:inline-flex">
            {isMac ? (
              <>
                <span className="font-bold text-base" style={{ fontFamily: 'monospace' }}>&#8984;</span>
                <span className="mx-0.5">+</span>
                <span className="mx-0.5">K</span>
              </>
            ) : (
              <>
                <span className="font-bold">Ctrl</span>
                <span className="mx-0.5">+</span>
                <span>K</span>
              </>
            )}
          </span>
        </span>
      </CommonHeaderIconBtn>
    </>
  );
};

export default HeaderBlogSearch;
