# Stage 2｜对外价值主张（One-page）& 市场竞品/规模分析  
（主场景：**涉密核心区域** + **浴室跌倒等老人看护场景**；技术路线：**DVS 事件相机 + WiFi Sensing（RuView 作为辅助）**；默认 **全本地化**）

---

## 1）对外价值主张（一页版）

### 产品一句话
**给“不能装摄像头”的空间一套可审计的安全监测能力：不看人像，只报事件。**  
通过 **DVS 事件相机（只感知变化）** 与 **WiFi Sensing（可遮挡/穿墙兜底）** 的多模态融合，在满足隐私/涉密要求的前提下，输出可行动的风险事件（闯入、徘徊、疑似跌倒、长时间静止）。

### 目标用户画像（谁会买）
**ToB 为主：**  
- **涉密/高敏感区域**：数据中心/机房、涉密办公室、核心仓库、实验室、产线关键工位、金融/政务敏感区域（禁止 RGB 视频或对“人像泄露”高度敏感）。  
- **机构养老/护理**：尤其是**浴室/床边/夜间**等“最需要监测但最不能拍摄”的区域。  

### 关键痛点（为什么现在必须要）
1. **传统 RGB 监控不可用/不可被接受**：即便“打码/脱敏”，也常被合规与心理门槛否决。  
2. **漏报成本极高**：闯入/跌倒/失联等事件一旦漏报，后果重大（安全、责任、运营）。  
3. **复杂环境下稳定性问题**：黑暗、逆光、遮挡、烟雾、反光、空间狭窄（浴室）等场景下，传统方案误报/漏报治理成本高。  

### 我们提供的解决方案（怎么解决）
**全本地 Edge Box + 多传感器输入 + 只输出事件/指标：**
- **DVS 事件相机**：高时序、低数据量，擅长“闯入/徘徊/跌倒瞬态”等动目标事件。  
- **WiFi Sensing（RuView 辅助）**：对遮挡、黑暗、甚至非视线更稳，擅长“存在/长静止/失联”兜底（降低漏报）。  
- （可选）mmWave/PIR：进一步增强浴室/遮挡强场景的冗余。  

### 输出是什么（交付给客户的“可行动结果”）
（不输出视频/人像）  
- **房间级占用/存在**：是否有人、持续时长、异常变化。  
- **风险事件告警（辅助告警）**：闯入/越界/徘徊、疑似跌倒、长时间静止/失联（带置信度、去抖/冷却策略）。  
- **可审计**：本地事件日志、设备健康与告警链路追溯；支持对接门禁/安防平台/护士站系统。  

### 核心优势（为什么是我们）
1. **隐私/涉密“从传感器到系统”一致**：默认本地推理、最小化数据、可审计，不把“原始人像/视频”引入系统。  
2. **多模态冗余，面向“低漏报”设计**：DVS 擅长运动瞬态，WiFi 擅长遮挡与静止兜底 → 比单一雷达/热感/摄像头更能压漏报。  
3. **工程化交付路径清晰**：RuView 提供 WiFi sensing 的工程底座（设备侧、实时链路、边缘优先、运维思路），让多模态产品更快做成可部署系统。  

---

## 2）市场是否有成熟方案/替代方案？我们的差异化位置

### 2.1 现有成熟/替代方案（市场教育已完成）
> 结论：**单一模态的“无摄像头监测”已较成熟**，但“同时覆盖涉密安防 + 浴室跌倒”且以**低漏报**为核心的多模态融合，仍存在明显产品空位。

**A. mmWave/雷达（养老看护很强）**  
- 代表：Vayyar Care（4D imaging radar，强调 camera-free、fall alerts、可与 nurse call 集成等）  

**B. 低分辨率热成像/热信号（楼宇/养老两端都有）**  
- 代表：Butlr（隐私优先传感，面向办公室、养老/护理；MIT 报道其已销售 20,000+ 传感器，说明“隐私传感”商业化成立）  

**C. WiFi Sensing（入侵/占用/节能）**  
- 代表：Origin Wireless（TruPresence 提供 intrusion/occupancy，并强调 edge computing 与隐私）  

**D. 事件相机工业化产品/平台（传感器侧成熟，但系统化落地要自己做）**  
- 平台/生态：Prophesee（应用页直接包含 fall detection、intruder detection 等用例叙事）  
- 工业事件相机产品：Pepperl+Fuchs VOC（提供 ring buffer、REST/UDP trigger、livestream 等产品化能力）  

### 2.2 我们的差异化（对外表述）
1. **“摄像头禁区”专用**：不是给普通场景“更清晰的图”，而是给“不能有图”的场景“可靠的事件”。  
2. **把‘低漏报’放到第一性**：用 DVS + WiFi（+可选雷达）做多源一致性，提高关键事件的检出率。  
3. **全本地可审计**：满足涉密网络隔离与审计要求；输出事件与指标而非视频流。  

---

## 3）市场规模与增长（用可引用的“相邻市场”做测算锚点）

> 说明：你做的产品处在 **“视频监控（巨大存量）”** 与 **“隐私友好型感知（新增长）”** 的交叉地带；直接统计“摄像头禁区监控市场”很难，因此用相邻市场做 **TAM/SAM 锚点** 更适合对外沟通。

### 3.1 存量替代市场（传统视频监控）
- 全球视频监控市场：2026 年 **USD 43.22B**，预计 2035 年 **USD 98.77B**（CAGR 9.5%）。隐私与合规被列为重要约束因素之一。  
  → **意义**：摄像头是巨大的存量市场，而“隐私/合规”正在制造“非传统监控”的切入口。  

### 3.2 老人看护与被动式监测（我们的直接落地 SAM）
- Ambient Assisted Living (AAL) 市场：2026 年 **USD 13.48B** → 2031 年 **USD 35.84B**（CAGR 21.6%），其中 safety & security 是关键功能之一。  
- Fall Detection System 市场：2026 年 **USD 792.09M** → 2035 年 **USD 1,668.45M**（CAGR 8.63%）。  
  → **意义**：浴室跌倒/夜间看护属于“刚需 + 强付费能力”的子赛道；市场增长显著，且隐私友好方案更容易被机构接受。  

### 3.3 建筑/空间占用感知（涉密/楼宇侧扩展 SAM）
- Occupancy Sensor 市场：2026 年 **USD 3.5B** → 2033 年 **USD 7.6B**（CAGR 11.9%）。  
  → **意义**：涉密场景往往也有“占用/异常进入/滞留”的需求，且采购逻辑接近楼宇安防与空间运营。  

### 3.4 上游关键器件趋势（DVS 供应链在增长）
- Event Camera 市场：2025 年 **USD 5.13B** → 2030 年 **USD 10.24B**（CAGR 14.82%）。  
  → **意义**：事件相机正从研究走向产业化，供应链与软件生态会越来越成熟，利好你做系统化产品集成。  

---

## 4）建议你在对外材料里怎么“讲清楚我们是谁”

**一句话口径**：  
> 我们做的是“摄像头禁区”的安全监测：不采集肖像、不输出画面，只输出可审计的风险事件；通过 DVS + WiFi 的多模态融合，把关键事件的漏报降下来，并能全本地部署满足涉密要求。

**三条卖点**：  
1) **Privacy by design（不是后置脱敏）**  
2) **Low-miss-rate by fusion（多源一致性）**  
3) **Local & auditable（本地可交付/可验收/可审计）**  

---

## Sources
- [Ambient Assisted Living Market Size & Share Analysis - Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/ambient-assisted-living-aal-market)  
- [Fall Detection System Market Overview - IndustryResearch.biz](https://www.industryresearch.biz/market-reports/fall-detection-system-market-100695)  
- [Occupancy Sensor Market Size and Trends - Persistence Market Research](https://www.persistencemarketresearch.com/market-research/occupancy-sensor-market.asp)  
- [Event Camera Market Size & Share Analysis - Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/event-camera-market)  
- [Video Surveillance Market Overview - Business Research Insights](https://www.businessresearchinsights.com/market-reports/video-surveillance-market-123108)  
- [Creating smart buildings with privacy-first sensors (Butlr) - MIT News](https://news.mit.edu/2025/butlr-creates-smart-buildings-with-privacy-first-sensors-0211)  
- [Vayyar Care - Why VayyarCare](https://www.vayyar.com/care-pages/why/)  
- [Origin Wireless TruPresence](https://www.originwirelessai.com/trupresence-2/)  
- [Prophesee Applications (includes fall detection / intruder detection)](https://www.prophesee.ai/event-based-vision-applications/)  
- [Pepperl+Fuchs VOC Industrial Event Camera (product page)](https://www.pepperl-fuchs.com/es/products-gp25581/117934)  
- [Sony IMX636 Event-based Vision Sensor Flyer (PDF)](https://www.sony-semicon.com/files/62/flyer_industry/IMX636-AAMR-Flyer.pdf)

