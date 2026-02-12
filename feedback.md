## Issues

1. [Chapter 8 >> #what-is-static-rendering](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering#what-is-static-rendering)

    "revalidating data." link doesn't redirect to correct docs page.
    
    Current Page - https://nextjs.org/docs/app/getting-started/fetching-data#revalidating-data
    
    Expected Page - https://nextjs.org/docs/app/getting-started/caching-and-revalidating




## Recommendations

1. [Chapter 8](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering)

    In the chapter topics, third topic "Different approaches to make your dashboard dynamic." appears to be misleading as there is no such direct content in the page.


2. [Chapter 10 >> #4-updating-the-table](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#4-updating-the-table)

- Use `PageProps` type instead of hardcoded type for the props parameter of `Page` component

    ```tsx
    export default async function Page(props: PageProps<'/dashboard/invoices'>) {
        const searchParams = await props.searchParams;
         // ...
    }
    ```

- Similarly, in [Chapter 11 >> #2-read-the-invoice-id-from-page-param](https://nextjs.org/learn/dashboard-app/mutating-data#2-read-the-invoice-id-from-page-params), the `PageProps` type should have been used.

    ```tsx
    export default async function Page(props: PageProps<'/dashboard/invoices'>) {
	    const params = await props.params;
	    const id = params.id;
        // ...
    }
    ```
