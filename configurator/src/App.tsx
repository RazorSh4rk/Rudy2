import "./index.css";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { ThemeProvider } from "./components/ui/theme-provider";

export function App() {
  const parts = [
    { name: "2020 beam", size: 250, unit: "mm", quantity: 10, id: 1 },
    { name: "2020 beam", size: 300, unit: "mm", quantity: 4, id: 2 },
    { name: "2020 beam", size: 150, unit: "mm", quantity: 4, id: 3 },
    { name: "bearing", size: "f695", unit: "", quantity: 28, id: 4 },
  ]

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen w-full bg-[#020617] relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#020617",
            backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />

        <div className="w-[60%] mx-auto relative z-10">
          <FieldSet className="w-[60%] mx-auto">
            <FieldGroup>
              <Field>
                <Input placeholder="Bed Size" type="number" />
                <FieldDescription>assuming rectangular bed, only set one side</FieldDescription>
              </Field>
              <Field>
                <Input placeholder="Build Height" type="number" />
                <FieldDescription>the total usable Z height</FieldDescription>
              </Field>
              <Field>
                <Input placeholder="Toolhead Height" type="number" />
                <FieldDescription>by default you get ~120mm space, this fits an anthead standard flow with a sherpa mini</FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Thing</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>This many</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">{part.name}</TableCell>
                    <TableCell>{part.size}{part.unit}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </ThemeProvider>
  );
}


export default App;
