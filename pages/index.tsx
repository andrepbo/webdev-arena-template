import Head from 'next/head'
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, YAxis, LabelList } from 'recharts'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { FaRegFolderOpen } from 'react-icons/fa'
import { BsBell } from 'react-icons/bs'
import { RiFileEditLine, RiSettingsLine } from 'react-icons/ri'
import { LuAlarmClock, LuPlus, LuArrowUpFromLine } from 'react-icons/lu'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

const chartData = [
  { name: 'Jan', value: 300, barValue: 200 },
  { name: 'Feb', value: 400, barValue: 250 },
  { name: 'Mar', value: 450, barValue: 300 },
  { name: 'Apr', value: 420, barValue: 280 },
  { name: 'May', value: 430, barValue: 320 },
  { name: 'Jun', value: 480, barValue: 350 },
  { name: 'Jul', value: 470, barValue: 330 },
  { name: 'Aug', value: 460, barValue: 340 },
  { name: 'Sep', value: 440, barValue: 300 },
  { name: 'Oct', value: 460, barValue: 320 },
  { name: 'Nov', value: 520, barValue: 400 },
  { name: 'Dec', value: 480, barValue: 360 },
]

const trafficStats = [
  {
    name: 'Approved',
    value: 1405665,
    percentage: '56.3%',
    rate: '94.3%',
    color: '#9CE8B2',
  },
  {
    name: 'Under review',
    value: 478540,
    percentage: '32.6%',
    rate: '97.7%',
    color: '#A89CFF',
  },
  {
    name: '2pas Verification',
    value: 239003,
    percentage: '62.0%',
    rate: '80.1%',
    color: '#9CD8FF',
  },
  {
    name: 'Fraudulent',
    value: 2375777,
    percentage: '74.5%',
    rate: '67.0%',
    color: '#FFA1D2',
  },
  {
    name: 'Other',
    value: 566040,
    percentage: '40.1%',
    rate: '95.4%',
    color: '#E0E0E0',
  },
]

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-yellow-200 px-3 py-1 rounded-full text-xs font-semibold text-black shadow">
        +{payload[0].value}k
      </div>
    )
  }
  return null
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Head>
        <title>Financial Security Report</title>
        <meta name="description" content="Dashboard showing financial data" />
      </Head>

      <main className="flex gap-6 w-full">
        {/* Sidebar */}
        <div className="hidden md:block pl-4 pt-4 pb-4">
          <aside className="hidden md:flex flex-col items-center w-16 bg-[#F7F7F7] dark:bg-[#1e1e1e] py-6 space-y-4 rounded-2xl sticky top-0 self-start min-h-screen">
            <SidebarIcon href="#"><MdOutlineSpaceDashboard size={22} /></SidebarIcon>
            <SidebarIcon href="#" active><FaRegFolderOpen size={22} /></SidebarIcon>
            <SidebarIcon href="#"><BsBell size={22} /></SidebarIcon>
            <SidebarIcon href="#"><RiFileEditLine size={22} /></SidebarIcon>
            <SidebarIcon href="#"><LuAlarmClock size={22} /></SidebarIcon>
            <SidebarIcon href="#"><RiSettingsLine size={22} /></SidebarIcon>
          </aside>
        </div>

        {/* Main content */}
        <section className="flex-1 pt-6 px-4 lg:pr-6">
          {/* Header + Prevention Measures */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-6 gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Financial<br />security report
              </h1>
            </div>

            <div className="flex flex-row gap-4 lg:w-1/3 w-full items-start">
              <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl p-6 w-full">
                <h3 className="font-medium text-lg text-black dark:text-white mb-2">Prevention Measures</h3>
                <p className="text-gray-500 text-sm">
                  Conduct regular audits to ensure all financial transactions and reporting are in compliance with regulations and policies.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-1">
                <button className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black">
                  <LuPlus size={20} />
                </button>
                <button className="w-10 h-10 bg-[#F7F7F7] dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center">
                  <LuArrowUpFromLine size={20} className="text-black dark:text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6 mb-6">
            {/* Overview */}
            <div className="lg:w-2/3 w-full">
              {/* Blue Card */}
              <div className="bg-[#E8F4F6] dark:bg-[#1e2a2c] p-6 rounded-t-3xl shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-black dark:text-white">Overview</h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Q1·2023 ↔ Q4·2023</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9D9D9" />
                      <YAxis hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="barValue" fill="white" radius={[4, 4, 0, 0]} barSize={20} />
                      <Line dataKey="value" stroke="#5BBFB5" strokeWidth={2.5} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gray Bottom */}
              <div className="bg-[#F7F7F7] dark:bg-[#2a2a2a] rounded-b-3xl px-8 py-4 shadow-sm flex justify-between text-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Peak date</p>
                  <p className="text-black text-lg font-medium dark:text-white">10.06.2023</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Amount</p>
                  <p className="text-black text-lg font-medium dark:text-white">564893</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Raise</p>
                  <p className="text-black text-lg font-medium dark:text-white">+19920</p>
                </div>
              </div>
            </div>

            {/* Performance, Prevention and Traffic */}
            <div className="lg:w-1/3 w-full flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Performance */}
                <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-3xl p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-light text-black dark:text-white">Performance</h2>
                      <p className="text-gray-500 dark:text-gray-400 text-md">Source on stats</p>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center">
                      <span className="text-xl text-black dark:text-white">+</span>
                    </button>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <span className="text-4xl font-light text-black dark:text-white">88%</span>
                    <span className="ml-2 px-2 py-1 bg-[#E0F252] rounded-full text-xs text-black font-medium">+524k</span>
                  </div>
                </div>

                {/* Prevention */}
                <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-3xl p-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-light text-black dark:text-white">Prevention</h2>
                      <p className="text-gray-500 dark:text-gray-400 text-md">Source on stats</p>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center">
                      <span className="text-xl text-black dark:text-white">+</span>
                    </button>
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <span className="text-4xl font-light text-black dark:text-white">99%</span>
                    <span className="ml-2 px-2 py-1 bg-[#E0F252] rounded-full text-xs text-black font-medium">+17.4k</span>
                  </div>
                </div>
              </div>

              {/* Traffic */}
              <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-3xl p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-light text-black dark:text-white">Traffic</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-md">Source on stats</p>
                  </div>
                  <span className="text-black dark:text-white font-medium text-sm">Q4 · &#39;23</span>
                </div>

                {/* Colored bar */}
                <div className="flex h-2 mb-6 rounded-full overflow-hidden">
                  {trafficStats.map((item, index) => (
                    <div
                      key={index}
                      style={{ width: `${100 / trafficStats.length}%`, backgroundColor: item.color }}
                      className="h-full"
                    />
                  ))}
                </div>

                <div className="border-t-2 border-gray-200 my-2"></div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <tbody>
                      {trafficStats.map((item, index) => (
                        <tr key={index} className="text-sm">
                          <td className="py-2">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="font-medium text-black dark:text-white text-sm">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-2 text-right">
                            <span className="font-medium text-black dark:text-white text-sm">
                              {item.value.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-2 text-right">
                            <span className="font-medium text-gray-500 dark:text-gray-400 text-sm">
                              {item.percentage}
                            </span>
                          </td>
                          <td className="py-2 text-right">
                            <span className="font-medium text-black dark:text-white text-sm">{item.rate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Yearly Overview */}
          <div className="bg-[#E8F4F6] dark:bg-[#1e2a2c] rounded-3xl p-6 mt-6 mb-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-black dark:text-white">Yearly Overview</h2>
              <p className="text-gray-400 dark:text-gray-500 font-medium">Jan – Dec</p>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D9D9D9" />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="barValue" fill="white" radius={[4, 4, 0, 0]} barSize={20}>
                    <LabelList
                      dataKey="name"
                      position="top"
                      style={{ fill: '#333', fontSize: 12 }}
                      className="dark:fill-gray-300"
                    />
                  </Bar>
                  <Line dataKey="value" stroke="#5BBFB5" strokeWidth={2.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function SidebarIcon({
  children,
  active = false,
  href = '#',
}: {
  children: React.ReactNode
  active?: boolean
  href?: string
}) {
  return (
    <a
      href={href}
      className={`w-10 h-10 rounded-lg flex items-center justify-center p-1 transition-colors
        ${active ? 'bg-black text-[#E0F252]' : 'bg-[#F2F2F2] dark:bg-[#2a2a2a] text-black dark:text-white'}`}
    >
      {children}
    </a>
  )
}