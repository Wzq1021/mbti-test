import { useState } from 'react'
import './App.css'

// MBTI测试问题
const questions = [
  // 外向(E) vs 内向(I)
  {
    id: 1,
    question: "在支付决策时，你更倾向于：",
    options: [
      { value: 'E', text: "与朋友或家人讨论后再决定" },
      { value: 'I', text: "独自思考后做决定" }
    ],
    dimension: "EI"
  },
  {
    id: 2,
    question: "当使用新的支付方式时，你会：",
    options: [
      { value: 'E', text: "积极尝试并分享给他人" },
      { value: 'I', text: "先观察别人使用后再尝试" }
    ],
    dimension: "EI"
  },
  // 感觉(S) vs 直觉(N)
  {
    id: 3,
    question: "选择支付方式时，你更关注：",
    options: [
      { value: 'S', text: "具体的费用和安全性" },
      { value: 'N', text: "创新功能和未来潜力" }
    ],
    dimension: "SN"
  },
  {
    id: 4,
    question: "评估支付工具时，你更重视：",
    options: [
      { value: 'S', text: "当前的使用体验和稳定性" },
      { value: 'N', text: "未来的发展空间和可能性" }
    ],
    dimension: "SN"
  },
  // 思考(T) vs 情感(F)
  {
    id: 5,
    question: "当支付出现问题时，你会：",
    options: [
      { value: 'T', text: "理性分析问题原因并寻求解决方案" },
      { value: 'F', text: "首先关注自己的感受，然后寻求帮助" }
    ],
    dimension: "TF"
  },
  {
    id: 6,
    question: "选择支付平台时，你会考虑：",
    options: [
      { value: 'T', text: "平台的技术实力和安全性" },
      { value: 'F', text: "平台的用户口碑和服务态度" }
    ],
    dimension: "TF"
  },
  // 判断(J) vs 知觉(P)
  {
    id: 7,
    question: "对于日常支付，你更倾向于：",
    options: [
      { value: 'J', text: "有计划地使用固定的支付方式" },
      { value: 'P', text: "根据不同场景灵活选择支付方式" }
    ],
    dimension: "JP"
  },
  {
    id: 8,
    question: "管理个人财务时，你会：",
    options: [
      { value: 'J', text: "制定详细的预算和支出计划" },
      { value: 'P', text: "保持灵活，根据实际情况调整" }
    ],
    dimension: "JP"
  }
];

// MBTI类型对应的全面分析
const mbtiAnalysis = {
  "ISTJ": {
    name: "物流师型",
    description: "你是一个务实、有条理的人，重视传统和稳定性。",
    energySource: "能量主要来自内部思考和独处时间",
    attentionDirection: "注意力主要指向外部现实和具体事务",
    expressionThinkingRelation: "思考先于表达，表达时注重事实和逻辑",
    informationGathering: "通过感官获取具体、可验证的信息",
    informationProcessing: "通过逻辑分析和系统化思考处理信息",
    informationPreference: "偏好具体、实际、可操作的信息",
    decisionLogic: "基于客观事实和逻辑分析做出决策",
    focus: "关注细节、规则和实际结果",
    communicationStyle: "直接、简洁、注重事实和实用性",
    lifeRhythm: "喜欢规律、可预测的生活节奏",
    taskProcessing: "按计划逐步完成任务，注重顺序和流程",
    decisionPreference: "偏好基于经验和传统的稳定决策",
    workStyle: [
      "在工作中重视规则和流程，喜欢按计划行事",
      "注重细节，做事认真负责，可靠性高",
      "偏好结构化的工作环境，擅长组织和管理",
      "决策时基于事实和经验，而非直觉"
    ],
    lifeStyle: [
      "在生活中喜欢稳定和可预测的节奏",
      "重视家庭和传统价值观",
      "理财观念保守，注重储蓄和长期规划",
      "交友谨慎，倾向于维持长久的关系"
    ],
    paymentAdvice: [
      "选择安全可靠的传统支付方式，如银行转账或信用卡",
      "建立详细的财务计划和预算",
      "关注支付的安全性和稳定性，避免使用未经证实的新支付工具"
    ]
  },
  "ISFJ": {
    name: "守卫者型",
    description: "你是一个温暖、负责任的人，重视和谐和帮助他人。",
    energySource: "能量主要来自内部思考和个人价值观",
    attentionDirection: "注意力主要指向外部环境和他人需求",
    expressionThinkingRelation: "表达时注重情感和人际关系",
    informationGathering: "通过感官获取具体、实用的信息",
    informationProcessing: "通过个人价值观和情感因素处理信息",
    informationPreference: "偏好与他人相关、有实际用途的信息",
    decisionLogic: "基于个人价值观和对他人影响做出决策",
    focus: "关注他人需求、和谐关系和具体帮助",
    communicationStyle: "温暖、体贴、注重他人感受",
    lifeRhythm: "喜欢稳定、有序的生活节奏",
    taskProcessing: "注重细节，按部就班完成任务",
    decisionPreference: "偏好考虑他人感受和整体和谐的决策",
    workStyle: [
      "在工作中乐于助人，注重团队和谐",
      "认真负责，善于照顾他人的需求",
      "擅长细节工作，有耐心和毅力",
      "决策时考虑他人感受，重视团队共识"
    ],
    lifeStyle: [
      "在生活中重视家庭和朋友，喜欢照顾他人",
      "注重传统和礼仪，尊重社会规范",
      "喜欢稳定的生活环境，不喜欢剧烈变化",
      "善于营造温馨的家庭氛围"
    ],
    paymentAdvice: [
      "选择用户友好、服务态度好的支付平台",
      "关注支付的便利性和可靠性",
      "考虑使用有家庭共享功能的支付工具"
    ]
  },
  "INFJ": {
    name: "提倡者型",
    description: "你是一个理想主义、有洞察力的人，重视深层意义和价值观。",
    energySource: "能量主要来自内部思考和个人价值观",
    attentionDirection: "注意力主要指向内部抽象概念和未来可能性",
    expressionThinkingRelation: "表达时注重深层意义和个人价值观",
    informationGathering: "通过直觉获取抽象、有意义的信息",
    informationProcessing: "通过个人价值观和整体思考处理信息",
    informationPreference: "偏好有意义、有深度、与价值观相关的信息",
    decisionLogic: "基于个人价值观和对他人的影响做出决策",
    focus: "关注意义、价值、未来可能性和他人潜能",
    communicationStyle: "深度、富有洞察力、注重意义和价值",
    lifeRhythm: "喜欢有意义、有目标的生活节奏",
    taskProcessing: "注重整体规划，追求有意义的成果",
    decisionPreference: "偏好符合个人价值观和长远意义的决策",
    workStyle: [
      "在工作中注重意义和价值，追求理想",
      "有洞察力，善于理解他人的动机和需求",
      "擅长战略思考和长远规划",
      "决策时基于价值观和直觉，而非纯粹的逻辑"
    ],
    lifeStyle: [
      "在生活中重视精神层面的满足",
      "喜欢深度的人际关系，追求心灵共鸣",
      "对个人成长和自我完善有强烈需求",
      "倾向于选择符合自己价值观的生活方式"
    ],
    paymentAdvice: [
      "选择符合你价值观的支付平台，如支持环保或社会责任的平台",
      "关注支付工具的创新性和未来发展",
      "考虑使用有公益捐赠功能的支付方式"
    ]
  },
  "INTJ": {
    name: "建筑师型",
    description: "你是一个战略思维、独立的人，重视逻辑和效率。",
    energySource: "能量主要来自内部思考和独立分析",
    attentionDirection: "注意力主要指向内部抽象概念和未来可能性",
    expressionThinkingRelation: "思考先于表达，表达时注重逻辑和战略",
    informationGathering: "通过直觉获取抽象、概念性的信息",
    informationProcessing: "通过逻辑分析和系统思考处理信息",
    informationPreference: "偏好概念性、战略性、有逻辑结构的信息",
    decisionLogic: "基于逻辑分析和长远战略做出决策",
    focus: "关注战略、效率、创新和长远目标",
    communicationStyle: "直接、简洁、注重逻辑和战略性",
    lifeRhythm: "喜欢有目标、有计划的生活节奏",
    taskProcessing: "注重战略规划，追求高效和创新解决方案",
    decisionPreference: "偏好基于逻辑分析和长远利益的决策",
    workStyle: [
      "在工作中擅长战略规划和系统思考",
      "独立思考能力强，喜欢解决复杂问题",
      "注重效率和结果，对自己和他人要求高",
      "决策时基于逻辑分析，而非情感因素"
    ],
    lifeStyle: [
      "在生活中喜欢独立思考和自主决策",
      "对知识和智慧有强烈追求",
      "偏好有计划的生活，善于自我管理",
      "社交圈较小但深度，重视思想交流"
    ],
    paymentAdvice: [
      "选择技术先进、功能强大的支付平台",
      "关注支付的效率和成本效益",
      "考虑使用有投资或理财功能的支付工具"
    ]
  },
  "ISTP": {
    name: "鉴赏家型",
    description: "你是一个灵活、实际的人，重视即时体验和解决问题的能力。",
    energySource: "能量主要来自内部思考和实际操作",
    attentionDirection: "注意力主要指向外部现实和具体问题",
    expressionThinkingRelation: "通过行动和实践表达思考",
    informationGathering: "通过感官获取具体、实用的信息",
    informationProcessing: "通过逻辑分析和实际操作处理信息",
    informationPreference: "偏好具体、实用、可操作的信息",
    decisionLogic: "基于实际情况和逻辑分析做出决策",
    focus: "关注实际问题、效率和即时结果",
    communicationStyle: "简洁、直接、注重实际和实用性",
    lifeRhythm: "喜欢灵活、随遇而安的生活节奏",
    taskProcessing: "灵活应对任务，注重实际效果和效率",
    decisionPreference: "偏好基于实际情况和即时需求的决策",
    workStyle: [
      "在工作中擅长解决实际问题，动手能力强",
      "灵活适应变化，喜欢挑战和新鲜事物",
      "注重效率，讨厌繁琐的流程和规则",
      "决策时基于实际情况，快速行动"
    ],
    lifeStyle: [
      "在生活中喜欢尝试新事物，追求刺激和体验",
      "动手能力强，喜欢修理和制作东西",
      "生活方式灵活，不喜欢被束缚",
      "重视个人空间和自由"
    ],
    paymentAdvice: [
      "选择操作简单、响应迅速的支付方式",
      "关注支付的便捷性和实用性",
      "考虑使用有返现或优惠功能的支付工具"
    ]
  },
  "ISFP": {
    name: "探险家型",
    description: "你是一个敏感、灵活的人，重视个人体验和审美。",
    energySource: "能量主要来自内部感受和个人体验",
    attentionDirection: "注意力主要指向外部现实和个人感受",
    expressionThinkingRelation: "通过个人感受和创意表达思考",
    informationGathering: "通过感官获取具体、个人相关的信息",
    informationProcessing: "通过个人感受和价值观处理信息",
    informationPreference: "偏好与个人体验、审美相关的信息",
    decisionLogic: "基于个人价值观和情感因素做出决策",
    focus: "关注个人体验、审美价值和和谐关系",
    communicationStyle: "温和、富有创意、注重个人感受",
    lifeRhythm: "喜欢灵活、随心情变化的生活节奏",
    taskProcessing: "注重个人兴趣和创意表达，灵活处理任务",
    decisionPreference: "偏好符合个人价值观和情感需求的决策",
    workStyle: [
      "在工作中注重个人价值和兴趣",
      "擅长创意表达和艺术相关工作",
      "对他人的感受敏感，善于共情",
      "喜欢灵活的工作环境，讨厌严格的规则"
    ],
    lifeStyle: [
      "在生活中重视个人感受和审美体验",
      "喜欢艺术、自然和美的事物",
      "生活方式灵活，随心情变化",
      "重视人际关系的质量，而非数量"
    ],
    paymentAdvice: [
      "选择界面美观、用户体验好的支付平台",
      "关注支付的个性化和多样性",
      "考虑使用支持艺术或创意产业的支付工具"
    ]
  },
  "INFP": {
    name: "调停者型",
    description: "你是一个理想主义、富有同情心的人，重视个人价值观和和谐。",
    energySource: "能量主要来自内部价值观和个人理想",
    attentionDirection: "注意力主要指向内部抽象概念和个人价值观",
    expressionThinkingRelation: "通过个人价值观和情感表达思考",
    informationGathering: "通过直觉获取抽象、有意义的信息",
    informationProcessing: "通过个人价值观和情感因素处理信息",
    informationPreference: "偏好有意义、与价值观相关的信息",
    decisionLogic: "基于个人价值观和对他人的影响做出决策",
    focus: "关注意义、价值、个人成长和和谐关系",
    communicationStyle: "温和、富有同理心、注重意义和价值",
    lifeRhythm: "喜欢有意义、符合个人价值观的生活节奏",
    taskProcessing: "注重个人兴趣和意义，灵活处理任务",
    decisionPreference: "偏好符合个人价值观和道德准则的决策",
    workStyle: [
      "在工作中注重个人价值观和意义",
      "善于理解他人，有强烈的同情心",
      "擅长创意和人文相关工作",
      "决策时基于价值观和情感，而非纯粹的利益"
    ],
    lifeStyle: [
      "在生活中重视个人成长和自我实现",
      "追求内心的和谐与平静",
      "对他人的痛苦敏感，愿意提供帮助",
      "喜欢有深度、有意义的人际关系"
    ],
    paymentAdvice: [
      "选择符合你个人价值观的支付平台",
      "关注支付的透明度和公平性",
      "考虑使用支持社会公益的支付工具"
    ]
  },
  "INTP": {
    name: "逻辑学家型",
    description: "你是一个好奇、分析能力强的人，重视逻辑和创新。",
    energySource: "能量主要来自内部思考和智力探索",
    attentionDirection: "注意力主要指向内部抽象概念和逻辑关系",
    expressionThinkingRelation: "通过逻辑分析和质疑表达思考",
    informationGathering: "通过直觉获取抽象、概念性的信息",
    informationProcessing: "通过逻辑分析和系统思考处理信息",
    informationPreference: "偏好概念性、逻辑性、创新性的信息",
    decisionLogic: "基于逻辑分析和理性思考做出决策",
    focus: "关注逻辑、创新、知识和理论探索",
    communicationStyle: "理性、富有逻辑性、喜欢质疑和探索",
    lifeRhythm: "喜欢灵活、基于兴趣的生活节奏",
    taskProcessing: "注重逻辑分析和创新解决方案，灵活处理任务",
    decisionPreference: "偏好基于逻辑分析和理性思考的决策",
    workStyle: [
      "在工作中擅长分析和解决复杂问题",
      "好奇心强，喜欢探索新思想和新方法",
      "独立思考能力强，不轻易接受权威观点",
      "决策时基于逻辑分析，重视证据和理性"
    ],
    lifeStyle: [
      "在生活中喜欢思考和学习，追求知识",
      "对抽象概念和理论有浓厚兴趣",
      "生活方式灵活，不喜欢过多的约束",
      "社交圈较小，但重视思想交流"
    ],
    paymentAdvice: [
      "选择技术创新、功能丰富的支付平台",
      "关注支付的安全性和技术可靠性",
      "考虑使用支持加密货币或区块链技术的支付工具"
    ]
  },
  "ESTP": {
    name: "企业家型",
    description: "你是一个精力充沛、行动导向的人，重视冒险和即时结果。",
    energySource: "能量主要来自外部活动和社交互动",
    attentionDirection: "注意力主要指向外部现实和即时体验",
    expressionThinkingRelation: "通过行动和实践表达思考",
    informationGathering: "通过感官获取具体、实用的信息",
    informationProcessing: "通过逻辑分析和实际操作处理信息",
    informationPreference: "偏好具体、实用、即时相关的信息",
    decisionLogic: "基于实际情况和即时需求做出决策",
    focus: "关注即时结果、实际问题和行动机会",
    communicationStyle: "直接、生动、注重实际和即时效果",
    lifeRhythm: "喜欢活跃、多变的生活节奏",
    taskProcessing: "快速行动，注重即时结果和实际效果",
    decisionPreference: "偏好基于实际情况和即时需求的决策",
    workStyle: [
      "在工作中喜欢行动和挑战，不畏惧风险",
      "擅长随机应变，适应能力强",
      "注重实际结果，讨厌空谈理论",
      "决策迅速，基于当前情况和直觉"
    ],
    lifeStyle: [
      "在生活中充满活力，喜欢社交和娱乐",
      "追求刺激和新鲜感，不喜欢单调的生活",
      "善于处理危机和紧急情况",
      "重视当下的体验和享受"
    ],
    paymentAdvice: [
      "选择快速、便捷的支付方式",
      "关注支付的即时性和实用性",
      "考虑使用有奖励或促销功能的支付工具"
    ]
  },
  "ESFP": {
    name: "表演者型",
    description: "你是一个热情、外向的人，重视社交和享受生活。",
    energySource: "能量主要来自外部社交和感官体验",
    attentionDirection: "注意力主要指向外部现实和社交互动",
    expressionThinkingRelation: "通过社交互动和情感表达思考",
    informationGathering: "通过感官获取具体、社交相关的信息",
    informationProcessing: "通过个人感受和社交反馈处理信息",
    informationPreference: "偏好与社交互动、感官体验相关的信息",
    decisionLogic: "基于个人感受和社交因素做出决策",
    focus: "关注社交互动、感官体验和即时快乐",
    communicationStyle: "热情、活泼、富有表现力、注重社交互动",
    lifeRhythm: "喜欢活跃、社交丰富的生活节奏",
    taskProcessing: "注重社交互动和即时反馈，灵活处理任务",
    decisionPreference: "偏好符合社交需求和情感体验的决策",
    workStyle: [
      "在工作中充满热情，善于与人交往",
      "喜欢变化和多样性，不喜欢重复的工作",
      "擅长即兴发挥和现场表现",
      "决策时基于个人感受和当下情况"
    ],
    lifeStyle: [
      "在生活中喜欢社交和娱乐，善于营造氛围",
      "重视当下的体验和快乐",
      "对他人的情绪敏感，善于调节气氛",
      "喜欢丰富多彩的生活方式"
    ],
    paymentAdvice: [
      "选择社交性强、有分享功能的支付平台",
      "关注支付的趣味性和互动性",
      "考虑使用支持线下消费和娱乐的支付工具"
    ]
  },
  "ENFP": {
    name: "竞选者型",
    description: "你是一个热情、创意丰富的人，重视可能性和人际关系。",
    energySource: "能量主要来自外部社交和创意互动",
    attentionDirection: "注意力主要指向外部可能性和人际关系",
    expressionThinkingRelation: "通过创意和社交互动表达思考",
    informationGathering: "通过直觉获取抽象、可能性相关的信息",
    informationProcessing: "通过个人价值观和社交因素处理信息",
    informationPreference: "偏好与可能性、创意、人际关系相关的信息",
    decisionLogic: "基于个人价值观和社交影响做出决策",
    focus: "关注可能性、创意、人际关系和个人成长",
    communicationStyle: "热情、富有创意、善于激发他人、注重可能性",
    lifeRhythm: "喜欢多变、充满可能性的生活节奏",
    taskProcessing: "注重创意和人际关系，灵活处理任务",
    decisionPreference: "偏好符合个人价值观和社交影响的决策",
    workStyle: [
      "在工作中充满创意和热情，善于激发他人",
      "喜欢探索新可能性，不喜欢常规和限制",
      "擅长与人沟通和建立关系",
      "决策时基于直觉和价值观，而非纯粹的逻辑"
    ],
    lifeStyle: [
      "在生活中充满活力和好奇心，喜欢尝试新事物",
      "重视人际关系的质量和深度",
      "对个人成长和自我实现有强烈需求",
      "喜欢有意义、有挑战性的生活"
    ],
    paymentAdvice: [
      "选择创新、有趣的支付平台",
      "关注支付的多样性和灵活性",
      "考虑使用支持创业或创意项目的支付工具"
    ]
  },
  "ENTP": {
    name: "辩论家型",
    description: "你是一个机智、好奇的人，重视挑战和创新。",
    energySource: "能量主要来自外部辩论和智力挑战",
    attentionDirection: "注意力主要指向外部可能性和逻辑挑战",
    expressionThinkingRelation: "通过辩论和逻辑挑战表达思考",
    informationGathering: "通过直觉获取抽象、可能性相关的信息",
    informationProcessing: "通过逻辑分析和辩论处理信息",
    informationPreference: "偏好与挑战、创新、逻辑相关的信息",
    decisionLogic: "基于逻辑分析和可能性探索做出决策",
    focus: "关注挑战、创新、逻辑和可能性探索",
    communicationStyle: "机智、富有挑战性、善于辩论和创新",
    lifeRhythm: "喜欢多变、充满挑战的生活节奏",
    taskProcessing: "注重挑战和创新，灵活处理任务",
    decisionPreference: "偏好基于逻辑分析和可能性探索的决策",
    workStyle: [
      "在工作中喜欢挑战传统，提出新想法",
      "擅长辩论和分析，思维敏捷",
      "不畏惧冲突，喜欢通过辩论找到最佳方案",
      "决策时基于逻辑分析和创新思维"
    ],
    lifeStyle: [
      "在生活中充满好奇心，喜欢探索新思想",
      "善于与人交流和辩论，思维活跃",
      "不喜欢常规和束缚，追求自由和多样性",
      "对知识和智慧有强烈追求"
    ],
    paymentAdvice: [
      "选择功能多样、富有挑战性的支付平台",
      "关注支付的创新性和竞争优势",
      "考虑使用支持投资或创业的支付工具"
    ]
  },
  "ESTJ": {
    name: "执行官型",
    description: "你是一个实际、果断的人，重视秩序和效率。",
    energySource: "能量主要来自外部活动和社交互动",
    attentionDirection: "注意力主要指向外部现实和具体事务",
    expressionThinkingRelation: "思考先于表达，表达时注重事实和效率",
    informationGathering: "通过感官获取具体、实用的信息",
    informationProcessing: "通过逻辑分析和系统化思考处理信息",
    informationPreference: "偏好具体、实用、可操作的信息",
    decisionLogic: "基于客观事实和逻辑分析做出决策",
    focus: "关注秩序、效率、实际结果和责任",
    communicationStyle: "直接、果断、注重事实和效率",
    lifeRhythm: "喜欢规律、有计划的生活节奏",
    taskProcessing: "按计划系统完成任务，注重效率和结果",
    decisionPreference: "偏好基于事实和效率的果断决策",
    workStyle: [
      "在工作中擅长组织和管理，重视秩序和规则",
      "决策果断，基于实际情况和经验",
      "注重效率和结果，对自己和他人要求高",
      "喜欢结构化的工作环境，擅长执行计划"
    ],
    lifeStyle: [
      "在生活中重视秩序和纪律，喜欢有计划的生活",
      "重视传统和社会规范，尊重权威",
      "善于管理个人和家庭事务",
      "交友谨慎，重视关系的质量和稳定性"
    ],
    paymentAdvice: [
      "选择成熟、可靠的支付平台",
      "关注支付的效率和规范性",
      "考虑使用支持企业或团队管理的支付工具"
    ]
  },
  "ESFJ": {
    name: "领事型",
    description: "你是一个热情、负责任的人，重视和谐和服务他人。",
    energySource: "能量主要来自外部社交和服务他人",
    attentionDirection: "注意力主要指向外部环境和他人需求",
    expressionThinkingRelation: "通过社交互动和服务他人表达思考",
    informationGathering: "通过感官获取具体、他人相关的信息",
    informationProcessing: "通过个人价值观和社交因素处理信息",
    informationPreference: "偏好与他人需求、社交互动相关的信息",
    decisionLogic: "基于个人价值观和对他人的影响做出决策",
    focus: "关注他人需求、和谐关系和服务他人",
    communicationStyle: "热情、关怀、注重他人感受和和谐",
    lifeRhythm: "喜欢规律、社交丰富的生活节奏",
    taskProcessing: "注重他人需求和团队和谐，系统完成任务",
    decisionPreference: "偏好考虑他人感受和整体和谐的决策",
    workStyle: [
      "在工作中重视团队和谐和他人需求",
      "善于与人沟通和合作，有强烈的责任感",
      "喜欢结构化的工作环境，擅长执行任务",
      "决策时考虑他人感受，重视团队共识"
    ],
    lifeStyle: [
      "在生活中重视家庭和社区，喜欢照顾他人",
      "善于营造和谐的人际关系",
      "重视传统和礼仪，尊重社会规范",
      "喜欢参与社区活动，为他人提供帮助"
    ],
    paymentAdvice: [
      "选择用户友好、服务周到的支付平台",
      "关注支付的可靠性和社会认可度",
      "考虑使用支持家庭或社区的支付工具"
    ]
  },
  "ENFJ": {
    name: "主人公型",
    description: "你是一个热情、有影响力的人，重视他人的成长和共同目标。",
    energySource: "能量主要来自外部社交和领导他人",
    attentionDirection: "注意力主要指向外部可能性和他人需求",
    expressionThinkingRelation: "通过领导和激励他人表达思考",
    informationGathering: "通过直觉获取抽象、他人相关的信息",
    informationProcessing: "通过个人价值观和社交因素处理信息",
    informationPreference: "偏好与他人成长、共同目标相关的信息",
    decisionLogic: "基于个人价值观和对他人的影响做出决策",
    focus: "关注他人成长、共同目标、和谐关系和影响力",
    communicationStyle: "热情、富有感染力、善于激励和引导他人",
    lifeRhythm: "喜欢有目标、社交丰富的生活节奏",
    taskProcessing: "注重他人成长和共同目标，系统完成任务",
    decisionPreference: "偏好考虑他人成长和整体利益的决策",
    workStyle: [
      "在工作中擅长领导和激励他人，有强烈的使命感",
      "善于理解他人的需求和动机",
      "重视团队合作和共同目标",
      "决策时考虑他人感受和整体利益"
    ],
    lifeStyle: [
      "在生活中重视人际关系的质量和深度",
      "喜欢帮助他人成长和实现目标",
      "对社会问题有责任感，愿意贡献自己的力量",
      "善于营造和谐、积极的生活氛围"
    ],
    paymentAdvice: [
      "选择有社会影响力、支持公益的支付平台",
      "关注支付的透明度和社会责任",
      "考虑使用支持教育或社区发展的支付工具"
    ]
  },
  "ENTJ": {
    name: "指挥官型",
    description: "你是一个果断、有领导力的人，重视战略和效率。",
    energySource: "能量主要来自外部活动和领导挑战",
    attentionDirection: "注意力主要指向外部可能性和战略目标",
    expressionThinkingRelation: "思考先于表达，表达时注重战略和领导力",
    informationGathering: "通过直觉获取抽象、战略相关的信息",
    informationProcessing: "通过逻辑分析和系统思考处理信息",
    informationPreference: "偏好与战略、效率、领导力相关的信息",
    decisionLogic: "基于逻辑分析和战略考虑做出决策",
    focus: "关注战略目标、效率、领导力和竞争优势",
    communicationStyle: "直接、果断、富有战略性、善于领导和激励",
    lifeRhythm: "喜欢有目标、充满挑战的生活节奏",
    taskProcessing: "注重战略规划和高效执行，系统完成任务",
    decisionPreference: "偏好基于战略分析和长远利益的果断决策",
    workStyle: [
      "在工作中擅长战略规划和领导团队",
      "决策果断，基于逻辑分析和长远利益",
      "对自己和他人要求高，追求卓越",
      "喜欢挑战和竞争，不畏惧困难"
    ],
    lifeStyle: [
      "在生活中喜欢有计划、有目标的生活",
      "重视效率和结果，善于管理时间和资源",
      "对个人成长和自我提升有强烈需求",
      "喜欢与有能力、有志向的人交往"
    ],
    paymentAdvice: [
      "选择功能强大、效率高的支付平台",
      "关注支付的成本效益和战略价值",
      "考虑使用支持企业管理或投资的支付工具"
    ]
  }
};

// 支付行业适合度分析
const paymentIndustryFit = {
  "high": [
    "ISTJ", "INTJ", "ESTJ", "ENTJ", "ISTP", "INTP"
  ],
  "medium": [
    "ISFJ", "ESFJ", "ENFJ", "ENTP", "ESTP"
  ],
  "low": [
    "ISFP", "INFP", "ESFP", "ENFP"
  ],
  "advice": {
    "high": "你非常适合在支付行业工作，尤其是在风险管理、合规、技术开发、战略规划等领域。你的逻辑思维、注重细节、追求效率的特点与支付行业的需求高度匹配。",
    "medium": "你适合在支付行业的客户服务、市场推广、产品设计等领域工作。你的人际交往能力和适应性可以为支付行业带来独特的价值。",
    "low": "你可能在支付行业的创意设计、用户体验、品牌建设等领域找到适合自己的位置。建议寻找能够发挥你创意和人际关系优势的具体岗位。"
  }
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [mbtiType, setMbtiType] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // 处理用户回答
  const handleAnswer = (optionValue) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));

    // 进入下一题或完成测试
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 计算MBTI类型
      calculateMbtiType();
      setShowResult(true);
    }
  };

  // 计算MBTI类型
  const calculateMbtiType = () => {
    // 统计每个维度的得分
    const scores = {
      EI: { E: 0, I: 0 },
      SN: { S: 0, N: 0 },
      TF: { T: 0, F: 0 },
      JP: { J: 0, P: 0 }
    };

    // 遍历所有回答，计算得分
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        scores[question.dimension][answerValue]++;
      }
    });

    // 确定每个维度的倾向
    let mbti = '';
    mbti += scores.EI.E > scores.EI.I ? 'E' : 'I';
    mbti += scores.SN.S > scores.SN.N ? 'S' : 'N';
    mbti += scores.TF.T > scores.TF.F ? 'T' : 'F';
    mbti += scores.JP.J > scores.JP.P ? 'J' : 'P';

    setMbtiType(mbti);
  };

  // 重新开始测试
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMbtiType(null);
    setShowResult(false);
  };

  // 分享结果到社交媒体
  const shareResult = () => {
    const shareText = `我的MBTI类型是：${mbtiType} - ${mbtiAnalysis[mbtiType].name}\n\n${mbtiAnalysis[mbtiType].description}\n\n来测试你的MBTI类型吧！`;
    
    if (navigator.share) {
      navigator.share({
        title: '我的MBTI性格测试结果',
        text: shareText,
        url: window.location.href
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(shareText).then(() => {
        alert('结果已复制到剪贴板，可以分享给朋友！');
      });
    }
  };

  // 计算测试进度百分比
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  // 获取支付行业适合度
  const getPaymentIndustryFit = () => {
    if (paymentIndustryFit.high.includes(mbtiType)) {
      return { level: "high", advice: paymentIndustryFit.advice.high };
    } else if (paymentIndustryFit.medium.includes(mbtiType)) {
      return { level: "medium", advice: paymentIndustryFit.advice.medium };
    } else {
      return { level: "low", advice: paymentIndustryFit.advice.low };
    }
  };

  const industryFit = showResult ? getPaymentIndustryFit() : null;

  return (
    <div className="app">
      <h1 className="title">MBTI性格与支付偏好测试</h1>
      
      {!showResult ? (
        <div className="test-container">
          <div className="question-progress">
            问题 {currentQuestionIndex + 1}/{questions.length}
          </div>
          
          {/* 测试进度条 */}
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="question-card">
            <h2 className="question-text">{questions[currentQuestionIndex].question}</h2>
            <div className="options-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button 
                  key={index} 
                  className="option-button"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <h2 className="result-title">你的MBTI类型是：{mbtiType} - {mbtiAnalysis[mbtiType].name}</h2>
          <div className="result-card">
            <p className="mbti-description">{mbtiAnalysis[mbtiType].description}</p>
            
            {/* 详细维度分析 */}
            <div className="detailed-analysis">
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">能量来源：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].energySource}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">注意力指向：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].attentionDirection}</p>
                </div>
              </div>
              
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">表达与思考关系：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].expressionThinkingRelation}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">获取信息的方式：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].informationGathering}</p>
                </div>
              </div>
              
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">信息加工的方式：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].informationProcessing}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">对信息的偏好：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].informationPreference}</p>
                </div>
              </div>
              
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">决策逻辑：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].decisionLogic}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">关注重心：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].focus}</p>
                </div>
              </div>
              
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">沟通风格：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].communicationStyle}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">生活节奏：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].lifeRhythm}</p>
                </div>
              </div>
              
              <div className="analysis-row">
                <div className="analysis-item">
                  <h4 className="analysis-label">任务处理：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].taskProcessing}</p>
                </div>
                <div className="analysis-item">
                  <h4 className="analysis-label">决策偏好：</h4>
                  <p className="analysis-value">{mbtiAnalysis[mbtiType].decisionPreference}</p>
                </div>
              </div>
            </div>
            
            {/* 传统分析部分 */}
            <h3 className="advice-title">工作风格：</h3>
            <ul className="advice-list">
              {mbtiAnalysis[mbtiType].workStyle.map((item, index) => (
                <li key={index} className="advice-item">{item}</li>
              ))}
            </ul>
            
            <h3 className="advice-title">生活风格：</h3>
            <ul className="advice-list">
              {mbtiAnalysis[mbtiType].lifeStyle.map((item, index) => (
                <li key={index} className="advice-item">{item}</li>
              ))}
            </ul>
            
            <h3 className="advice-title">支付建议：</h3>
            <ul className="advice-list">
              {mbtiAnalysis[mbtiType].paymentAdvice.map((advice, index) => (
                <li key={index} className="advice-item">{advice}</li>
              ))}
            </ul>
            
            {/* 支付行业适合度分析 */}
            <h3 className="advice-title">支付行业适合度：</h3>
            <div className="industry-fit-card">
              <p className="industry-fit-advice">{industryFit.advice}</p>
            </div>
          </div>
          
          <div className="result-actions">
            <button className="restart-button" onClick={restartTest}>
              重新测试
            </button>
            <button className="share-button" onClick={shareResult}>
              分享结果
            </button>
          </div>
          
          {/* 类型匹配提示 */}
          <div className="match-tip">
            <p>💡 提示：了解他人的MBTI类型可以帮助你更好地与他们沟通和合作！</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
