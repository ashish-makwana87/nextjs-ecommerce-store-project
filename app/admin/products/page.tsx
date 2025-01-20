import EmptyList from "@/components/global/EmptyList";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminProducts } from "@/utils/actions";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import React from "react";

async function AdminProductsPage() {
  const products = await fetchAdminProducts();

  if (products.length < 1) {
    return (
      <EmptyList text='Product list in empty. Create some products to see them here.' />
    );
  }

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='md:text-lg text-black'>
              Product Name
            </TableHead>
            <TableHead className='md:text-lg text-black'>Company</TableHead>
            <TableHead className='md:text-lg text-black'>Price</TableHead>
            <TableHead className='md:text-lg text-black'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell>
                  <Link href={`/products/${item.id}`}>{item.name}</Link>
                </TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{formatPrice(item.price)}</TableCell>
                <TableCell className='flex flex-col gap-2'>
                  <Button
                    asChild
                    size='sm'
                    variant='secondary'
                    className='mr-2 w-full bg-[#323232] text-white hover:bg-[#000000]'
                  >
                    <Link href={`/admin/products/${item.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    asChild
                    size='sm'
                    variant='secondary'
                    className='bg-red-700 text-white hover:bg-red-800'
                  >
                    <Link href={`/admin/products/${item.id}`}>Delete</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Separator className='mt-4' />
      <h4 className='head-4 mt-4 text-primary'>
        Total products: {products.length}
      </h4>
    </section>
  );
}

export default AdminProductsPage;
