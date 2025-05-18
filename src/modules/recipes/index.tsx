import { RecipesList } from "./recipes-list";

export const Recipes = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl sm:text-2xl  font-bold flex gap-1">
          <span className="text-muted-foreground">*</span> <p>Recipes</p>
        </h1>
        <p className="text-muted-foreground">
          Here I share recipes for stuff cool that I have made
        </p>
      </div>
      <RecipesList />
    </div>
  );
};
