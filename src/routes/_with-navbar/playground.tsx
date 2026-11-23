import { createFileRoute } from '@tanstack/react-router';

import { SwitchShowcase } from '@/posts/recipes/components/switch-showcase';

const PlaygroundPage = () => {
  return (
    <div>
      <SwitchShowcase />
    </div>
  );
};

export const Route = createFileRoute('/_with-navbar/playground')({
  component: PlaygroundPage,
});
