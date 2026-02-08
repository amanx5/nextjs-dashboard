import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
	CardsSkeleton,
	LatestInvoicesSkeleton,
	RevenueChartSkeleton,
} from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page() {
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
				<Suspense fallback={<CardsSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>

			<div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
				<Suspense fallback={<RevenueChartSkeleton />}>
					<RevenueChart />
				</Suspense>

				<Suspense fallback={<LatestInvoicesSkeleton />}>
					<LatestInvoices />
				</Suspense>
			</div>
		</main>
	);
}

// network waterfall
// const revenue = await fetchRevenue();
// const latestInvoices = await fetchLatestInvoices();
// const cardData = await fetchCardData();

// parallel requests but still waiting for all to finish
// const revenuePromise = fetchRevenue();
// const latestInvoicesPromise = fetchLatestInvoices();
// const cardDataPromise = fetchCardData();

// const revenue = await revenuePromise;
// const latestInvoices = await latestInvoicesPromise;
// const cardData = await cardDataPromise;

// same as above but using Promise.allSettled
// const [fetchRevenueResult, fetchLatestInvoicesResult, fetchCardDataResult] =
// 	await Promise.allSettled([
// 		fetchRevenue(),
// 		fetchLatestInvoices(),
// 		fetchCardData(),
// 	]);

// const revenue =
// 	fetchRevenueResult.status === 'fulfilled'
// 		? fetchRevenueResult.value
// 		: [];

// const latestInvoices =
// 	fetchLatestInvoicesResult.status === 'fulfilled'
// 		? fetchLatestInvoicesResult.value
// 		: [];

// const cardData =
// 	fetchCardDataResult.status === 'fulfilled'
// 		? fetchCardDataResult.value
// 		: {
// 			numberOfCustomers: 0,
// 			numberOfInvoices: 0,
// 			totalPaidInvoices: '$0',
// 			totalPendingInvoices: '$0',
// 		};
