import { Helmet } from 'react-helmet-async'

import { DayOrdersAmmountCard } from './day-orders-ammount-card'
import { MonthCanceledOrdersAmmountCard } from './month-canceled-orders-ammount-card'
import { MonthOrdersAmmountCard } from './month-orders-ammount-card'
import { MonthRevenueCard } from './month-revenue-card'
import { PopularsProductsChart } from './popular-products-chart'
import { RevenueChart } from './revenue-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmmountCard />
          <DayOrdersAmmountCard />
          <MonthCanceledOrdersAmmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularsProductsChart />
        </div>
      </div>
    </>
  )
}
