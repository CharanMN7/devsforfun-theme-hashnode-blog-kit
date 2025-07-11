// MobX Stuff
import Image from 'next/legacy/image';
import { resizeImage } from '../utils/image';
import Link from 'next/link';
import masterConfig from '../master-config.json';

// type PublicationFooterProps = Pick<Publication, 'title' | 'postsCount' | 'imprint' | 'isTeam'> &
//   Pick<Publication['preferences'], 'disableFooterBranding' | 'logo' | 'darkMode'> & {
//     authorName: string;
//   }; // TODO: types need to be fixed

function PublicationFooter(props: any) {
  const { isTeam, authorName, title, imprint, disableFooterBranding, logo } = props;

  return (
    <footer
      className="relative shadow-[0_-4px_8px_-4px_rgba(15,23,43,0.30)] blog-footer-area -mt-px border-t bg-slate-100 px-5 py-10 text-center text-slate-800 dark:border-slate-800 dark:bg-black dark:text-slate-500 md:px-10 md:py-12 lg:pt-28 bg-cover bg-center bg-no-repeat shadow-t-md"
      style={{ backgroundImage: `url(${masterConfig.footer_bg_image})` }}
    >
      <div className="absolute inset-0 dark:bg-black/50 pointer-events-none" />
      {imprint && (
        <section className="blog-impressum mx-auto mb-10 rounded-lg border bg-white px-4 py-6 text-left dark:border-slate-800 dark:bg-transparent lg:w-3/4 xl:w-2/3">
          <p className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Impressum
          </p>
          {/* eslint-disable-next-line react/self-closing-comp */}
          <div
            className="prose mx-auto w-full dark:prose-dark"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: `${imprint}` }}
          ></div>
        </section>
      )}
      <div className="blog-footer-credits flex flex-col items-center justify-center">
        <div className="flex flex-col flex-wrap items-center">
          <p className="mb-2 text-white font-bold bg-black/10 backdrop-blur-md px-2 py-1 rounded-md">
            &copy;{new Date().getFullYear()} {title || `${authorName}'s Blog`}
          </p>
          <div className="flex flex-row items-center text-white font-bold">
            {/* <a href="https://hashnode.com/privacy?source=blog-footer" className="mx-2 underline">
                Privacy policy
              </a>
              <span className="font-extrabold text-black opacity-20 dark:text-white">&middot;</span>
              <a className="mx-2 underline" href="https://hashnode.com/terms?source=blog-footer">
                Terms
              </a> */}
          </div>
        </div>
      </div>
      <div className="blog-footer-credits flex flex-col items-center justify-center">
        <p className="text-sm text-white font-bold bg-black/10 backdrop-blur-md px-2 py-1 rounded-md">
          Powered by{' '}
          <a aria-label="devsForFun" href="https://www.devsforfun.com" target="_blank" className="underline">
            devsForFun
          </a>
        </p>
      </div>
    </footer >
  );
}

export default PublicationFooter;
