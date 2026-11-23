import { type Post } from '@/core/utils/post';

import { Header } from './components/header';
import { Intro } from './components/intro';
import { Location } from './components/location';
import { Sections } from './components/sections';

interface HomepageProps {
  blogs: Post[];
  recipes: Post[];
}

export const Homepage = ({ blogs, recipes }: HomepageProps) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Header />
          <Location />
        </div>
        <Intro />
      </div>
      <Sections blogs={blogs} recipes={recipes} />
    </div>
  );
};
