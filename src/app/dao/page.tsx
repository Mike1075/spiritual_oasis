"use client";

import { useTranslations } from "next-intl";
import { Vote, PieChart, Users, Award, TrendingUp, Shield } from "lucide-react";

export default function DAOPage() {
  const t = useTranslations("dao");

  const governanceFeatures = [
    {
      icon: Vote,
      title: "提案投票 / Proposal Voting",
      description: "持有XWT的用户可对社区重大事项进行投票，包括基金会资金使用、线下基地选址等",
    },
    {
      icon: PieChart,
      title: "财务透明 / Financial Transparency",
      description: "实时抓取链上数据，展示资金池、捐赠、营收的分配情况（30%捐赠/70%运营）",
    },
    {
      icon: Shield,
      title: "去中心化治理 / Decentralized Governance",
      description: "基于青色组织理念，实现自主管理、身心整合的社区治理模式",
    },
  ];

  const founderBenefits = [
    "终身课程折扣 / Lifetime Course Discount",
    "原始股权益 / Original Equity",
    "分红权 / Dividend Rights",
    "优先内测资格 / Priority Beta Access",
    "专属徽章SBT / Exclusive Badge SBT",
    "创始人社群 / Founders Community",
  ];

  const contributorRoles = [
    {
      role: "讲师 / Instructor",
      description: "经过认证的课程讲师，获得P通证认证",
      xwt: "500+ XWT/月",
    },
    {
      role: "志愿者 / Volunteer",
      description: "社区运营、活动组织、内容创作",
      xwt: "100-300 XWT/月",
    },
    {
      role: "翻译者 / Translator",
      description: "多语言内容翻译，助力全球化",
      xwt: "50-200 XWT/任务",
    },
    {
      role: "开发者 / Developer",
      description: "技术开发、智能合约、前端后端",
      xwt: "按项目分配",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="text-2xl text-gray-400 mb-4">{t("subtitle")}</p>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Governance Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            治理中心 / Governance Center
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {governanceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center mb-6">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Model */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            积分价值增值模型 / Value Appreciation Model
          </h2>
          <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Diagram */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <p className="text-white">贡献 → 获得 XWT</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <p className="text-white">XWT 质押 → 治理权 + 分红</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <p className="text-white">GMV增长 → XWT增值</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div className="flex-1 bg-gray-800/50 rounded-lg p-4">
                    <p className="text-white">营收分配 → 30%公益 / 70%运营</p>
                  </div>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="space-y-6">
                <div className="text-center p-6 bg-gray-800/30 rounded-2xl">
                  <TrendingUp className="mx-auto text-emerald-400 mb-2" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">通缩模型</div>
                  <p className="text-gray-400">XWT总量硬顶，越早参与价值越高</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-500/20 rounded-xl">
                    <div className="text-2xl font-bold text-purple-300">30%</div>
                    <p className="text-gray-400 text-sm">公益捐赠</p>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/20 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-300">70%</div>
                    <p className="text-gray-400 text-sm">社区运营</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 100 Founders */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Award className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">
              The 100 创始团队
            </h2>
          </div>

          <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800">
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
              成为心灵家园的前100位创始成员，获得独特权益与终身回报
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {founderBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 bg-purple-500/10 rounded-lg"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform">
                申请成为创始成员 / Apply for Founding Membership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contributor Roles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Users className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">
              共建者招募 / Contributor Recruitment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contributorRoles.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm">
                    {item.xwt}
                  </span>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-8 py-4 border border-purple-500 rounded-full text-purple-300 font-medium hover:bg-purple-500/20 transition-colors">
              提交申请 / Submit Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
