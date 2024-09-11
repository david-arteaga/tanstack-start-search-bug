import { createFileRoute, Link } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/')({
  component: HomeComponent,
  validateSearch: z.object({
    addBy: z.number().optional(),
  }),
});

function HomeComponent() {
  const search = Route.useSearch();
  const { addBy = 0 } = search;
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <pre>{JSON.stringify(search, null, 2)}</pre>
      <Link
        to={Route.to}
        activeOptions={{
          includeSearch: true,
        }}
        from="/"
        // the `?` is required here because prev is not always defined for some reason, which also seems to me like a bug
        search={(prev) => ({ addBy: (prev?.addBy ?? 1) + 1 })}
        preload="intent"
      >
        Increase addBy ({addBy})
      </Link>
    </div>
  );
}
