# DESIGN.md｜鹰眼（EagleEye）Stage2 Demo 设计说明（前端纯模拟）

> **目标读者**：产品/研发/测试/演示人员  
> **目标**：冻结 Demo 的产品边界、信息架构、数据模型、关键交互与 3D 表现方式，保证实现一致性。

---

## 1. 设计目标与范围

### 1.1 Demo 的“产品化”目标
在不引入后端的前提下，呈现一个可对外演示的“隐私防护监控装备”形态：
- **无图像化监控**：不展示任何可识别肖像画面
- **事件级输出**：闯入/徘徊、疑似跌倒（辅助告警）
- **可处置流程**：确认/关闭 + 处置留痕（Demo 级模拟）
- **可对接叙事**：门禁/访客系统联动（前端模拟）

### 1.2 明确不做（Stage2）
- 不接入真实 DVS/WiFi 设备流（仅 mock）
- 不做精确定位/轨迹追踪
- 不做身份识别
- 不存储原始流
- 不做云端管理

---

## 2. 信息架构（IA）与页面

### 2.1 页面列表（src/pages）
- `/` **态势总览**：KPI + 3D 房间态势（告警高亮） + 告警快照
- `/alarms` **告警中心**：告警表格 + 处置流程（确认/关闭）
- `/devices` **设备与点位**：设备健康与点位列表（DVS/WiFi/EdgeBox）

### 2.2 组件目录（src/components）
原则：页面只负责编排与状态管理；复用 UI 放在 components，并且每个组件都有测试用例。

当前建议组件（可扩展）：
- `AppShell`：整体布局（侧边栏+顶栏+内容区）
- `SideNav` / `TopBar`
- `Card`：卡片容器（统一风格）
- `Room3DView`：Three.js 3D 视图（房间/四角点位/告警联动）
- `AlarmTable` / `AlarmBadge` / `ConfirmDialog`
- `DeviceList`
- `KpiCard`

---

## 3. 数据模型（纯前端）

### 3.1 领域对象（src/utils/types.ts）
- `Device`
  - `kind`: `DVS | WIFI | EDGE_BOX`
  - `online`, `lastSeenAt`
  - `zone`（房间级）
- `AlarmEvent`
  - `type`: `INTRUSION | LOITERING | FALL_SUSPECTED | NO_MOTION`
  - `status`: `OPEN | ACKED | CLOSED`
  - `confidence`: 0..1
  - `deviceIds`, `zone`, `startAt/endAt`, `note`

### 3.2 数据来源（src/mock-data）
- `mock-data/alarms.ts`：告警种子数据
- `mock-data/devices.ts`：设备种子数据

### 3.3 状态管理（Demo 原则）
- 页面可用 `useState(seed)` 维护交互态（确认/关闭）
- 不允许持久化到 localStorage/indexedDB（避免“存储”争议）

---

## 4. 关键交互设计（产品流程）

### 4.1 告警处置（辅助告警）
告警状态机：
1) `OPEN`（未处理）  
2) `ACKED`（已确认：人工已知晓，可能在处置中）  
3) `CLOSED`（已关闭：不再重复提示，但可追溯）  

处置动作：
- **确认**：仅允许从 `OPEN -> ACKED`
- **关闭**：允许从 `OPEN/ACKED -> CLOSED`

> Demo 的“审计”体现：至少在 UI 中保留状态变化与备注字段（后续可扩展为 AuditLog）。

### 4.2 门禁/访客系统联动（演示级）
Stage2 不接后端，建议在 UI 中展示：
- 告警产生 → “核验授权/访客登记”按钮
- 点击后展示 mock 结果（例如：有授权/无授权/接口失败）

对外叙事：系统可通过 Webhook/HTTP API 将事件推送到门禁/访客系统，并拉取授权信息辅助值班员决策。

---

## 5. Three.js（Web3D）表现设计

### 5.1 设计目标
让观众“一眼看懂”这是面向“监控装备”的态势界面，而不是普通后台：
- 固定房间模型（盒状即可）
- 四角点位（传感器/监控点）
- 告警时：整体色调偏红/紫、点位高亮、HUD 提示“存在告警”

### 5.2 实现建议（Demo）
- 推荐用 `@react-three/fiber` + `@react-three/drei`：
  - `Canvas` 渲染
  - `OrbitControls` 限制视角（避免乱转导致演示失控）
  - `Html` 叠加 HUD 文案
- 告警联动：由 `zones` 输入决定当前是否处于 `warn` 状态

---

## 6. 样式系统（TailwindCSS + 暗黑卡片）

### 6.1 原则
- 全站只用 Tailwind class（允许少量全局 CSS 用于背景与噪点纹理）
- 卡片组件统一（border + blur + subtle glow）
- 强可读性：小字用 `zinc-400/500`，关键标题用 `zinc-100`

### 6.2 视觉禁区
避免“看起来像传统摄像头监控”：
- 不出现“视频窗口/回放/帧”的 UI 语言
- 不出现“抓拍/截图/导出视频”的交互

---

## 7. 测试策略（每个组件必须有测试）

### 7.1 组件测试基线
每个 `src/components/*.tsx` 文件必须有对应的 `*.test.tsx`：
- 能渲染
- 核心文案存在
- 核心交互可触发（例如弹窗打开/回调触发）

### 7.2 Three.js 组件测试策略
在测试环境（jsdom）无法真实 WebGL 渲染时：
- 在测试文件中 mock `@react-three/fiber` 的 `Canvas`
- 只验证 DOM 结构与关键 HUD 文案

---

## 8. 后续扩展点（Stage3 方向提示，不在 Demo 内实现）
- 加入真实设备接入层（DVS/WiFi/EdgeBox）
- 审计日志（AuditLog）与权限（RBAC）完善
- 门禁/访客系统真实联调与失败降级
- 多房间/多点位与批量运维能力

