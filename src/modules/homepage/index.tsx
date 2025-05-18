import { Header } from './components/header';
import { Intro } from './components/intro';
import { Location } from './components/location';
import { Sections } from './components/sections';

export const Homepage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Header />
        <Location />
        <Intro />
      </div>
      <Sections />
    </div>
  );
};
