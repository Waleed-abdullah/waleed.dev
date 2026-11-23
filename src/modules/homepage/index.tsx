import { type Post } from '@/core/utils/post';

import { Header } from './components/header';
import { Intro } from './components/intro';
import { Location } from './components/location';
import { OutsideWork } from './components/outside-work';
import { Sections } from './components/sections';

interface HomepageProps {
  blogs: Post[];
  recipes: Post[];
}

export const Homepage = ({ blogs, recipes }: HomepageProps) => {
  return (
    <div className="mx-auto flex w-full max-w-[36rem] flex-col gap-16 sm:gap-20">
      <header className="flex flex-col gap-5">
        <Header />
        <Location />
        <Intro />
      </header>
      <Sections blogs={blogs} recipes={recipes} />
      <OutsideWork />
    </div>
  );
};
