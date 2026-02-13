import { fetchFilteredCustomers } from '@/app/lib/data';
import { normalizeQuerySearchParam } from '@/app/lib/search-params';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Customers',
};

export default async function Page(props: PageProps<'/dashboard/customers'>) {
	const searchParams = await props.searchParams;
	const query = normalizeQuerySearchParam(searchParams?.query);

	const customers = await fetchFilteredCustomers(query);

	return (
		<main>
			<CustomersTable customers={customers} />
		</main>
	);
}
