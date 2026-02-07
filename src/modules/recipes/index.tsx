import { RecipesList } from './recipes-list';

export const Recipes = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="flex gap-1 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-muted-foreground">*</span> <p>Recipes</p>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Here I share recipes for cool stuff that I have made
        </p>
      </div>
      <RecipesList />
    </div>
  );
};
