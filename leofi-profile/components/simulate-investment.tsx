'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Slider } from "./ui/slider"
import { Switch } from "./ui/switch"
import { ArrowLeftRight, Save, Settings } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

const liquidityData = [
  { price: 190000, liquidity: 10 },
  { price: 192000, liquidity: 20 },
  { price: 194000, liquidity: 40 },
  { price: 196000, liquidity: 80 },
  { price: 198000, liquidity: 160 },
  { price: 200000, liquidity: 80 },
  { price: 202000, liquidity: 40 },
  { price: 204000, liquidity: 20 },
]

const correlationData = [
  { time: '00:00', price: 2500 },
  { time: '04:00', price: 2550 },
  { time: '08:00', price: 2600 },
  { time: '12:00', price: 2580 },
  { time: '16:00', price: 2620 },
  { time: '20:00', price: 2650 },
  { time: '24:00', price: 2680 },
]

export default function SimulateInvestment() {
  const [depositAmount, setDepositAmount] = useState('1000')
  const [calculationRange, setCalculationRange] = useState(30)
  const [currentPrice, setCurrentPrice] = useState(2654.19821861713)
  const [minPrice, setMinPrice] = useState(1990.6486639628241)
  const [maxPrice, setMaxPrice] = useState(3317.747773271401)

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-gray-100">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Select defaultValue="WETH">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Token 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WETH">WETH</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
              <ArrowLeftRight className="h-4 w-4" />
              <Select defaultValue="USDC">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Token 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-400">0.05%</div>
              <Button variant="ghost" size="icon">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save to Portfolio
              </Button>
              <Button>Change Pool</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Estimated Fees (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-500">$0.69</div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <span>Monthly</span>
                    <span className="text-purple-500">$20.56</span>
                  </div>
                  <div className="text-sm text-gray-400">2.06%</div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>Yearly (APR)</span>
                    <span className="text-purple-500">$250.14</span>
                  </div>
                  <div className="text-sm text-gray-400">25.01%</div>
                </div>
                <Button className="w-full mt-4">Simulate Position Performance</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Deposit Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="mb-4"
                />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>USDC</span>
                    <span>$558.94</span>
                  </div>
                  <div className="text-sm text-gray-400">558.9486 (55.89%)</div>
                  <div className="flex justify-between items-center">
                    <span>WETH</span>
                    <span>$441.06</span>
                  </div>
                  <div className="text-sm text-gray-400">0.1659 (44.11%)</div>
                </div>
                <Button className="w-full mt-4">Create Position</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Liquidity Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liquidityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="liquidity" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Liquidity Price Range (USDC per WETH)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Full Range:</span>
                <Switch />
                <span>Match Ticks</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Calculation Range (Days)</Label>
                  <Slider
                    value={[calculationRange]}
                    onValueChange={(value) => setCalculationRange(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" onClick={() => setCalculationRange(Math.max(0, calculationRange - 1))}>-</Button>
                    <span>{calculationRange}</span>
                    <Button variant="outline" size="sm" onClick={() => setCalculationRange(calculationRange + 1)}>+</Button>
                  </div>
                </div>
                <div>
                  <Label>Current Price</Label>
                  <Slider
                    value={[currentPrice]}
                    onValueChange={(value) => setCurrentPrice(value[0])}
                    min={1000}
                    max={5000}
                    step={0.01}
                  />
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPrice(Math.max(1000, currentPrice - 10))}>-</Button>
                    <span>{currentPrice.toFixed(2)}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPrice(Math.min(5000, currentPrice + 10))}>+</Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Label>Min Price (-25.00%)</Label>
                  <Slider
                    value={[minPrice]}
                    onValueChange={(value) => setMinPrice(value[0])}
                    min={1000}
                    max={currentPrice}
                    step={0.01}
                  />
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" onClick={() => setMinPrice(Math.max(1000, minPrice - 10))}>-</Button>
                    <span>{minPrice.toFixed(2)}</span>
                    <Button variant="outline" size="sm" onClick={() => setMinPrice(Math.min(currentPrice, minPrice + 10))}>+</Button>
                  </div>
                </div>
                <div>
                  <Label>Max Price (+25.00%)</Label>
                  <Slider
                    value={[maxPrice]}
                    onValueChange={(value) => setMaxPrice(value[0])}
                    min={currentPrice}
                    max={5000}
                    step={0.01}
                  />
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" onClick={() => setMaxPrice(Math.max(currentPrice, maxPrice - 10))}>-</Button>
                    <span>{maxPrice.toFixed(2)}</span>
                    <Button variant="outline" size="sm" onClick={() => setMaxPrice(Math.min(5000, maxPrice + 10))}>+</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">WETH / USDC Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <span className="text-gray-400">MIN</span>
                  <span className="ml-2">2195.810</span>
                </div>
                <div>
                  <span className="text-gray-400">PRICE</span>
                  <span className="ml-2">2657.894</span>
                </div>
                <div>
                  <span className="text-gray-400">AVG</span>
                  <span className="ml-2">2448.450</span>
                </div>
                <div>
                  <span className="text-gray-400">MAX</span>
                  <span className="ml-2">2680.937</span>
                </div>
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}