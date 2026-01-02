const axios = require('axios');
const config = require('../config/config');
const logger = require('../logs/logger');

/**
 * Planner 模块
 * 输入：用户需求
 * 输出：结构化任务计划
 */
async function generatePlan(prompt) {
    try {
        logger.info(`Planning via Gateway: ${config.gatewayUrl}`);

        const payload = {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
你是 BunnyEra AI 的 Planner 模块。
你的任务是将用户需求拆分成清晰、可执行的步骤。
输出格式必须是 JSON：
{
  "goal": "最终目标",
  "steps": [
    "步骤1",
    "步骤2",
    "步骤3"
  ]
}
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        };

        const response = await axios.post(
            `${config.gatewayUrl}/v1/chat/completions`,
            payload,
            { headers: { "Content-Type": "application/json" } }
        );

        const text = response.data.choices?.[0]?.message?.content || "";

        return {
            success: true,
            raw: text
        };

    } catch (err) {
        logger.error(`Planner error: ${err.message}`);

        return {
            success: false,
            error: err.message,
            details: err.response?.data || null
        };
    }
}

module.exports = {
    generatePlan
};