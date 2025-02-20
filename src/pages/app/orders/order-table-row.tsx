import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { deleteOrder } from '@/api/delete-ordet'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderProps) {
  const [orderDetailsIsOpen, setOrderDetailsIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: deleteOderFn } = useMutation({
    mutationFn: deleteOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      ordersListCached.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: 'canceled',
              }
            }

            return order
          }),
        })
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={orderDetailsIsOpen} onOpenChange={setOrderDetailsIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={orderDetailsIsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order && order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>{order && <OrderStatus status={order.status} />}</TableCell>
      <TableCell className="font-medium">
        {order && order.customerName}
      </TableCell>
      <TableCell className="font-medium">
        {order &&
          (order.total / 100).toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => deleteOderFn({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
          disabled={!['pending', 'processing'].includes(order.status)}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
