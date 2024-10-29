'use client'

declare global {
  interface Window {
    ethereum: {
      request: (args: { 
        method: string,
        params: any
       }) => Promise<any>;
    };
    aptos: {
      connect: () => Promise<any>;
      getAccountResources: (args: { method: string }) => Promise<any>;
      signAndSubmitTransaction: (args: any) => Promise<any>;
    };
  }
}

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Slider } from "./ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Award, BarChart2, DollarSign, TrendingUp, Users, Wallet, ArrowRightLeft, ExternalLink, RefreshCw, Percent, Globe } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import {
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export default function TraderProfile() {  
  const aptosConfig = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(aptosConfig);
  const {    
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    connect,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify 
  } = useWallet();
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [fromToken, setFromToken] = useState('APT')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState(1800)
  const [selectedToken, setSelectedToken] = useState('APT')
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('')
  const [showCrossChainPopup, setShowCrossChainPopup] = useState(false)
  const [selectedChain, setSelectedChain] = useState('Aptos')

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const slideIn = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const monthlyPerformance = [
    { month: 'January', value: 1.8 },
    { month: 'February', value: -0.5 },
    { month: 'March', value: 2.3 },
    { month: 'April', value: 1.2 },
    { month: 'May', value: -0.8 },
    { month: 'June', value: 1.5 },
  ]

  const strategyPerformance = [
    { date: '2023-01-01', strategy: 105, benchmark: 100 },
    { date: '2023-02-01', strategy: 108, benchmark: 102 },
    { date: '2023-03-01', strategy: 112, benchmark: 104 },
    { date: '2023-04-01', strategy: 110, benchmark: 103 },
    { date: '2023-05-01', strategy: 115, benchmark: 106 },
    { date: '2023-06-01', strategy: 120, benchmark: 108 },
    { date: '2023-07-01', strategy: 118, benchmark: 107 },
    { date: '2023-08-01', strategy: 125, benchmark: 110 },
    { date: '2023-09-01', strategy: 130, benchmark: 112 },
    { date: '2023-10-01', strategy: 128, benchmark: 111 },
    { date: '2023-11-01', strategy: 135, benchmark: 114 },
    { date: '2023-12-01', strategy: 140, benchmark: 116 },
  ]

  const dexAllocation = [
    { name: 'Uniswap', value: 35 },
    { name: 'SushiSwap', value: 25 },
    { name: 'Curve', value: 20 },
    { name: 'Balancer', value: 15 },
    { name: 'Others', value: 5 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  let txHash: string = "";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request connection to MetaMask wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          // Set the connected account address
          setAccount(accounts[0]);
          
          // Get the account balance
          const balanceHex = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          const balance = parseFloat(balanceHex) / Math.pow(10, 18); // Convert Wei to Ether
          setBalance(balance.toString());
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    } 

    // if ('aptos' in window) {
    //   try {
    //     // Request connection to Petra wallet
    //     const response = await window.aptos.connect();
        
    //     if (response.address) {
    //       // Set the connected account address
    //       setAccount(response.address);
          
    //       // Get the account balance
    //       const resource = await window.aptos.getAccountResources(response.address);
    //       const accountResource = resource.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
    //       if (accountResource) {
    //         const balance = accountResource.data.coin.value;
    //         setBalance(JSON.stringify(balance / 100000000)); // Convert octas to APT
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Failed to connect wallet:', error);
    //   }
    // } else {
    //   console.log('Please install Petra wallet!');
    // }   
  }

  // Helper function to format address for display
  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // Implement follow logic here
    console.log(isFollowing ? 'Unfollowed' : 'Followed')
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)
    setToAmount((parseFloat(value) * exchangeRate).toFixed(2))
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)
    setFromAmount((parseFloat(value) / exchangeRate).toFixed(6))
  }

  const handleCompound = () => {
    console.log(`Compounding ${compoundAmount} ${compoundToken} via ${compoundMethod}`)
    // Here you would typically call an API or smart contract function to execute the compounding
  }

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault()

    //0xA1F002bf7cAD148a639418D77b93912871901875

    console.log(`${tradeType.toUpperCase()} ${amount} ${selectedToken}`)
    // Implement actual trading logic here

    const contractAddress = "0xA1F002bf7cAD148a639418D77b93912871901875"; // EVM contract address
    const abi = [ // ABI of the contract function you want to call
        "function initialize(address initialOwner)"
    ];
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const tx = await contract.initialize("0x90de83fd2cd4d01660cd6909692568a14661cdf1"); // Call the buy function with parameters
        await tx.wait(); // Wait for the transaction to be mined
        alert(`Transaction successful: ${tx.hash}`);
    } catch (error) {
        console.error('Transaction failed:', error);
    }


    // console.log(`${tradeType.toUpperCase()} ${amount} ${selectedToken}`)
    // // Implement actual trading logic here

    // const moduleAddress = "0xf1a29176e0690487a0d8e10aec8d681935fe678ddc96165800d5f6f2b25b0c6f"
    // const addr = "0xe8ec9945a78a48452def46207e65a0a4ed6acd400306b977020924ae3652ab85"
    // const symbol = 'PQD'
    // const type = `${addr}::${symbol}::${symbol}`
    // const transaction = {
    //   function: `${moduleAddress}::leofi_module::buy`,
    //   type: 'entry_function_payload',
    //   type_arguments: [type],
    //   arguments: [
    //     24,
    //     11
    //   ],
    // };

    // const response = await window.aptos.signAndSubmitTransaction(transaction);
    // alert(`Transaction successfully: ${response.hash}`)
  }

  const handleCrossChainSwap = async (e: React.FormEvent) => {
    console.log(`Initiating cross-chain swap to ${selectedChain}`)
    // Here you would typically initiate the cross-chain swap process

    console.log(`${tradeType.toUpperCase()} ${amount} ${selectedToken}`)
    // Implement actual trading logic here

    const moduleAddress = "0xf1a29176e0690487a0d8e10aec8d681935fe678ddc96165800d5f6f2b25b0c6f"
    const addr = "0xe8ec9945a78a48452def46207e65a0a4ed6acd400306b977020924ae3652ab85"
    const symbol = 'PQD'
    const type = `${addr}::${symbol}::${symbol}`
    const transaction = {
      function: `${moduleAddress}::leofi_module::buy`,
      type: 'entry_function_payload',
      type_arguments: [type],
      arguments: [
        24,
        11
      ],
    };
    const response = await window.aptos.signAndSubmitTransaction(transaction);
    alert(`Transaction successfully: ${response.hash}`)
    setShowCrossChainPopup(false)
  }

  const recommendedTokens = ['XRP', 'MOJO', 'TORT', 'HIPPO', 'ZAPT'];

  // Mock data for the trading chart
  const tradingChartData = [
    { time: '09:00', price: 3000 },
    { time: '10:00', price: 3050 },
    { time: '11:00', price: 3025 },
    { time: '12:00', price: 3075 },
    { time: '13:00', price: 3100 },
    { time: '14:00', price: 3090 },
    { time: '15:00', price: 3110 },
  ]

  const [tradingHistory, setTradingHistory] = useState<Array<{
    date: string;
    token: string;
    type: string;
    amount: string;
    price: string;
    txHash: string;
  }>>([
    { date: '2023-10-01', token: 'APT', type: 'Buy', amount: '100', price: '$10.50', txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' },
    { date: '2023-09-28', token: 'BTC', type: 'Sell', amount: '0.5', price: '$27,000', txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890' },
    { date: '2023-09-25', token: 'ETH', type: 'Buy', amount: '2', price: '$1,600', txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba' },
    { date: '2023-09-20', token: 'USDC', type: 'Buy', amount: '1000', price: '$1.00', txHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210' },
    { date: '2023-09-15', token: 'APT', type: 'Sell', amount: '50', price: '$11.20', txHash: '0x5432109876fedcba5432109876fedcba5432109876fedcba5432109876fedcba' },
  ])

  const [compoundAmount, setCompoundAmount] = useState<number>(1000) // Assuming $1000 profit for demonstration
  const [compoundToken, setCompoundToken] = useState<string>('APT')
  const [compoundMethod, setCompoundMethod] = useState<string>('stake')
  const [autoCompound, setAutoCompound] = useState<boolean>(false)
  const [compoundFrequency, setCompoundFrequency] = useState<number>(7) // days

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden"
      >
        <CardHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between w-full">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LeoFi_4x4-qV8iHK5K8IxONkFo4Fe4Hwu9AwMHf0.jpg"
              alt="LeoFi Logo"
              width={100}
              height={100}
              className="h-12 w-auto"
            />
            <div className="flex items-center space-x-2">
              <Button
                variant={isFollowing ? "secondary" : "default"}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              {account ? (
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                </div>
              ) : (
                <Button variant="outline" onClick={connectWallet}>
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <motion.div variants={slideIn} className="p-6 flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Alex Morgan" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">Alex Morgan</CardTitle>
            <CardDescription>Senior Fund Manager at LeoFi Investments</CardDescription>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
              <Badge variant="secondary">Forex</Badge>
              <Badge variant="secondary">Commodities</Badge>
              <Badge variant="secondary">Crypto</Badge>
            </div>
          </div>
        </motion.div>

        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="trading">Trading</TabsTrigger>
              <TabsTrigger value="compound">Compound</TabsTrigger>
            </TabsList>
            <TabsContent value="performance">
              <motion.div variants={fadeIn} className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">AUM</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1.2B</div>
                      <p className="text-xs text-muted-foreground">+20% from last year</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">YTD Return</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">5.5%</div>
                      <p className="text-xs text-muted-foreground">+2.1% above benchmark</p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {monthlyPerformance.map((month, index) => (
                        <motion.div
                          key={month.month}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center">
                            <span className="flex-1">{month.month}</span>
                            <span className="mr-4 text-right">{month.value > 0 ? '+' : ''}{month.value.toFixed(1)}%</span>
                            <Progress value={(month.value + 3) * 10} className="w-1/3" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="background">
              <motion.div variants={fadeIn} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Background</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>15+ years of experience in financial markets</li>
                      <li>MBA from Harvard Business School</li>
                      <li>CFA Charterholder</li>
                      <li>Previously managed $500M hedge fund at BlackRock</li>
                      <li>Specializes in global macro strategies and algorithmic trading</li>
                    </ul>
                  </CardContent>
                </Card>                
              </motion.div>
            </TabsContent>
            <TabsContent value="strategy">
              <motion.div variants={fadeIn} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Alex employs a multi-strategy approach, combining fundamental analysis with quantitative models:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Global macro analysis for identifying market trends</li>
                      <li>Statistical arbitrage for exploiting price inefficiencies</li>
                      <li>Event-driven strategies for capitalizing on corporate actions</li>
                      <li>Advanced risk management using proprietary algorithms</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={strategyPerformance}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="strategy" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>DEX Protocol Funding Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dexAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {dexAllocation.map((entry, index) =>
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            )}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="trading">
              <motion.div variants={fadeIn} className="mt-4 grid gap-4">
              <Card>
                  <CardHeader>
                    <CardTitle>Trading</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Price Chart</h3>
                        <div className="w-full h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tradingChartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="price" stroke="#8884d8" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Trade</h3>
                        <form onSubmit={handleTrade} className="space-y-4">
                          <div>
                            <Label htmlFor="token">Token</Label>
                            <Select value={selectedToken} onValueChange={setSelectedToken}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select token" />
                              </SelectTrigger>
                              <SelectContent>
                                {recommendedTokens.map((token) => (
                                  <SelectItem key={token} value={token}>{token}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="tradeType">Trade Type</Label>
                            <Select value={tradeType} onValueChange={setTradeType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select trade type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="buy">Buy</SelectItem>
                                <SelectItem value="sell">Sell</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                              id="amount"
                              type="number"
                              placeholder="Enter amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            <ArrowRightLeft className="mr-2 h-4 w-4" /> 
                            {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedToken}
                          </Button>
                        </form>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Recommended Tokens:</h3>
                      <div className="flex flex-wrap gap-2">
                        {recommendedTokens.map((token) => (
                          <Badge key={token} variant="secondary">{token}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Trading History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Token</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tradingHistory.map((trade, index) => (
                          <TableRow key={index}>
                            <TableCell>{trade.date}</TableCell>
                            <TableCell>{trade.token}</TableCell>
                            <TableCell>{trade.type}</TableCell>
                            <TableCell>{trade.amount}</TableCell>
                            <TableCell>{trade.price}</TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(`https://explorer.aptoslabs.com/txn/${trade.txHash}`, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            <TabsContent value="compound">
              <motion.div variants={fadeIn} className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Compound Your Profits</CardTitle>
                    <CardDescription>Grow your investments by reinvesting your profits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="manual" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="manual">Manual Compound</TabsTrigger>
                        <TabsTrigger value="auto">Auto-Compound</TabsTrigger>
                      </TabsList>
                      <TabsContent value="manual">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="compound-amount">Amount to Compound</Label>
                            <Input
                              id="compound-amount"
                              type="number"
                              value={compoundAmount}
                              onChange={(e) => setCompoundAmount(Number(e.target.value))}
                              max={1000} // Assuming $1000 profit for demonstration
                            />
                          </div>
                          <div>
                            <Label htmlFor="compound-token">Select Token</Label>
                            <Select value={compoundToken} onValueChange={setCompoundToken}>
                              <SelectTrigger id="compound-token">
                                <SelectValue placeholder="Select token" />
                              </SelectTrigger>
                              <SelectContent>
                                {recommendedTokens.map((token) => (
                                  <SelectItem key={token} value={token}>{token}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="compound-method">Compound Method</Label>
                            <Select value={compoundMethod} onValueChange={setCompoundMethod}>
                              <SelectTrigger id="compound-method">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="stake">Stake</SelectItem>
                                <SelectItem value="farm">Farm</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="auto">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-compound">Enable Auto-Compound</Label>
                            <Switch
                              id="auto-compound"
                              checked={autoCompound}
                              onCheckedChange={setAutoCompound}
                            />
                          </div>
                          {autoCompound && (
                            <div>
                              <Label htmlFor="compound-frequency">Compound Frequency (days)</Label>
                              <div className="flex items-center space-x-2">
                                <Slider
                                  id="compound-frequency"
                                  min={1}
                                  max={30}
                                  step={1}
                                  value={[compoundFrequency]}
                                  onValueChange={(value) => setCompoundFrequency(value[0])}
                                />
                                <span>{compoundFrequency} days</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleCompound} className="w-full">
                      {autoCompound ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Set Auto-Compound
                        </>
                      ) : (
                        <>
                          <ArrowRightLeft className="mr-2 h-4 w-4" />
                          Compound Now
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Estimated Annual Yield: <span className="font-bold text-green-600">12%</span></p>
                  <p>Compound Effect: <span className="font-bold text-green-600">+2.3%</span> <Percent className="inline h-4 w-4 text-green-600" /></p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between p-6 border-t">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-sm text-muted-foreground">Top 1% performer in 2023</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart2 className="mr-2 h-4 w-4" /> View Full Analytics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Full Analytics - Alex Morgan</DialogTitle>
                <DialogDescription>
                  Comprehensive performance metrics and analysis
                </DialogDescription>
              </DialogHeader>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="mt-4 space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metric</TableHead>
                          <TableHead>1 Year</TableHead>
                          <TableHead>3 Year</TableHead>
                          <TableHead>5 Year</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Total Return</TableCell>
                          <TableCell>11.2%</TableCell>
                          <TableCell>32.7%</TableCell>
                          <TableCell>58.9%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Alpha</TableCell>
                          <TableCell>2.8%</TableCell>
                          <TableCell>2.5%</TableCell>
                          <TableCell>2.3%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Sharpe Ratio</TableCell>
                          <TableCell>1.4</TableCell>
                          <TableCell>1.3</TableCell>
                          <TableCell>1.2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Max Drawdown</TableCell>
                          <TableCell>-8.2%</TableCell>
                          <TableCell>-12.5%</TableCell>
                          <TableCell>-15.3%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: 'Equities', value: 45 },
                        { name: 'Fixed Income', value: 30 },
                        { name: 'Commodities', value: 15 },
                        { name: 'Crypto', value: 10 },
                      ].map((asset, index) => (
                        <motion.div
                          key={asset.name}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-center">
                            <span className="flex-1">{asset.name}</span>
                            <span className="mr-4 text-right">{asset.value}%</span>
                            <Progress value={asset.value} className="w-1/3" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogContent>
          </Dialog>
          <Dialog open={showCrossChainPopup} onOpenChange={setShowCrossChainPopup}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" /> Cross-Chain
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cross-Chain Opportunities</DialogTitle>
                <DialogDescription>
                  Explore and execute cross-chain swaps and investments
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chain-select">Select Target Chain</Label>
                  <Select value={selectedChain} onValueChange={setSelectedChain}>
                    <SelectTrigger id="chain-select">
                      <SelectValue placeholder="Select chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="Binance Smart Chain">Binance Smart Chain</SelectItem>
                      <SelectItem value="Solana">Solana</SelectItem>
                      <SelectItem value="Polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cross-chain-amount">Amount</Label>
                  <Input
                    id="cross-chain-amount"
                    type="number"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <Label htmlFor="cross-chain-token">Token</Label>
                  <Select>
                    <SelectTrigger id="cross-chain-token">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {recommendedTokens.map((token) => (
                        <SelectItem key={token} value={token}>{token}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCrossChainSwap} className="w-full">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Initiate Cross-Chain Swap
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </motion.div>
    </div>
  )
}