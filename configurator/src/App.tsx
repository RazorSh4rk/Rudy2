import { useState, useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

function App() {
  const [bedsize, setBedsize] = useState(150)
  const [zheight, setZheight] = useState(150)
  const [bedfamesizeOverride, setBedframesizeOverride] = useState<number | null>(null)
  const [framewidthOverride, setFramewidthOverride] = useState<number | null>(null)
  const [framedepthOverride, setFramedepthOverride] = useState<number | null>(null)
  const [toolheadheight, setToolheadheight] = useState(100)

  const computed = useMemo(() => {
    const bedframesize = bedfamesizeOverride ?? bedsize
    const framewidth = framewidthOverride ?? bedframesize + 100
    const framedepth = framedepthOverride ?? bedsize + 100
    const frameheight = zheight + toolheadheight

    return { bedframesize, framewidth, framedepth, frameheight }
  }, [bedsize, zheight, bedfamesizeOverride, framewidthOverride, framedepthOverride, toolheadheight])

  const parts = useMemo(() => [
    {
      what: '2020 extrusion',
      size: computed.bedframesize,
      pcs: 4,
    },
    {
      what: '2020 extrusion',
      size: computed.framedepth,
      pcs: 6,
    },
    {
      what: '2020 extrusion',
      size: computed.framewidth,
      pcs: 4,
    },
    {
      what: '1020 extrusion',
      size: computed.framewidth,
      pcs: 1,
    },
    {
      what: '2020 extrusion',
      size: computed.frameheight,
      pcs: 4,
    },
    {
      what: 'MGN9H rail',
      size: computed.framedepth,
      pcs: 2,
    },
    {
      what: 'MGN9H rail',
      size: computed.framewidth,
      pcs: 1,
    },
    {
      what: '8mm rod',
      size: zheight + 50,
      pcs: 4,
    },
    {
      what: '8mm rod',
      size: computed.framewidth + 50,
      pcs: 1,
    },
  ], [zheight, computed])

  const handleOptionalInput = (
    value: string,
    setter: (v: number | null) => void
  ) => {
    if (value === '') {
      setter(null)
    } else {
      const num = parseInt(value, 10)
      if (!isNaN(num) && num > 0) {
        setter(num)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rudy 2 Configurator</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bedsize">
                  bedsize <span className="text-primary">*</span>
                </Label>
                <Input
                  id="bedsize"
                  type="number"
                  value={bedsize}
                  onChange={(e) => setBedsize(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zheight">
                  zheight <span className="text-primary">*</span>
                </Label>
                <Input
                  id="zheight"
                  type="number"
                  value={zheight}
                  onChange={(e) => setZheight(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Optional overrides</p>
              <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="bedframesize" className="text-xs">bedframesize</Label>
                  <Input
                    id="bedframesize"
                    type="number"
                    className="h-8 text-sm"
                    placeholder={`${computed.bedframesize}`}
                    value={bedfamesizeOverride ?? ''}
                    onChange={(e) => handleOptionalInput(e.target.value, setBedframesizeOverride)}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="framewidth" className="text-xs">framewidth</Label>
                  <Input
                    id="framewidth"
                    type="number"
                    className="h-8 text-sm"
                    placeholder={`${computed.framewidth}`}
                    value={framewidthOverride ?? ''}
                    onChange={(e) => handleOptionalInput(e.target.value, setFramewidthOverride)}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="framedepth" className="text-xs">framedepth</Label>
                  <Input
                    id="framedepth"
                    type="number"
                    className="h-8 text-sm"
                    placeholder={`${computed.framedepth}`}
                    value={framedepthOverride ?? ''}
                    onChange={(e) => handleOptionalInput(e.target.value, setFramedepthOverride)}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toolheadheight" className="text-xs">toolheadheight</Label>
                  <Input
                    id="toolheadheight"
                    type="number"
                    className="h-8 text-sm"
                    value={toolheadheight}
                    onChange={(e) => setToolheadheight(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frameheight" className="text-xs">frameheight</Label>
                  <Input
                    id="frameheight"
                    type="number"
                    className="h-8 text-sm opacity-50"
                    value={computed.frameheight}
                    disabled
                    title="Computed: zheight + toolheadheight"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Notes</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Default toolhead is standard flow Anthead + Sherpa Mini</li>
            <li>100mm toolhead height is for this setup (50mm x overtravel, 0mm y)</li>
            <li>Recommended to size for increases of 50mm</li>
          </ul>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Parts List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part</TableHead>
                  <TableHead>Size (mm)</TableHead>
                  <TableHead className="text-center">Pcs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((part, i) => (
                  <TableRow key={i}>
                    <TableCell>{part.what}</TableCell>
                    <TableCell className="font-mono text-primary">{part.size}</TableCell>
                    <TableCell className="text-center">{part.pcs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
