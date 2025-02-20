import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

// Define the TypeScript interface for the table rows
interface Product {
  id: number; // Unique identifier for each product
  name: string; // Product name
  category: string; // Category of the product
  price: string; // Price of the product (as a string with currency symbol)
  // status: string; // Status of the product
  image: string; // URL or path to the product image
  status: "Activo" | "Canceled"; // Status of the product
}

const tableData: Product[] = [
  {
    id: 1,
    name: "Garantia 1",
    category: "socio",
    price: "$2399.00",
    status: "Activo",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/360/482/non_2x/money-insurance-protection-guarantees-document-bank-deposit-wealth-care-cash-investment-secure-currency-safety-warranty-policy-banking-coverage-savings-trust-concept-financial-contract-vector.jpg",
  },
  {
    id: 2,
    name: "Garantia 1",
    category: "Socio ",
    price: "$879.00",
    status: "Canceled",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/360/482/non_2x/money-insurance-protection-guarantees-document-bank-deposit-wealth-care-cash-investment-secure-currency-safety-warranty-policy-banking-coverage-savings-trust-concept-financial-contract-vector.jpg",
  },
  {
    id: 3,
    name: "Garantia 1",
    category: "Socio ",
    price: "$1869.00",
    status: "Activo",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/360/482/non_2x/money-insurance-protection-guarantees-document-bank-deposit-wealth-care-cash-investment-secure-currency-safety-warranty-policy-banking-coverage-savings-trust-concept-financial-contract-vector.jpg",
  },
  {
    id: 4,
    name: "Garantia 1",
    category: "Socio ",
    price: "$1699.00",
    status: "Canceled",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/360/482/non_2x/money-insurance-protection-guarantees-document-bank-deposit-wealth-care-cash-investment-secure-currency-safety-warranty-policy-banking-coverage-savings-trust-concept-financial-contract-vector.jpg",
  },
  {
    id: 5,
    name: "Garantia 1",
    category: "Socio ",
    price: "$240.00",
    status: "Activo",
    image:
      "https://static.vecteezy.com/system/resources/previews/015/360/482/non_2x/money-insurance-protection-guarantees-document-bank-deposit-wealth-care-cash-investment-secure-currency-safety-warranty-policy-banking-coverage-savings-trust-concept-financial-contract-vector.jpg",
  },
];

export default function GarantiasRecientes() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Garantias Recientes
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Garantias
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Garantias
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Garantias
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Garantias
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span
                    className={`px-2 py-1.5 rounded-full text-xs font-medium text-white ${
                      product.status === "Activo"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
