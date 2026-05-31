# Surplus Food React Demo

一个基于 React + Vite 的移动端小 demo，界面参考校园临期食品购买流程。页面在电脑浏览器中以手机尺寸展示，可以完成简单的商品浏览、查看详情、查看取货信息、结账和生成订单。

## 功能

- 首页浏览附近食品盲盒
- 搜索和筛选商品
- 点击商品进入详情页
- 收藏商品
- 查看取货地址和取货说明
- 进入结账页
- 切换支付方式
- 输入优惠码并应用折扣
- 完成购买并生成取货码
- 在订单页查看已购买订单

## 运行方式

先安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

启动后在浏览器打开终端里显示的地址，通常是：

```text
http://127.0.0.1:5173/
```

如果 `5173` 端口被占用，Vite 会自动换到其他端口，例如 `5174`。

## 构建

```bash
npm run build
```

构建产物会生成在 `dist/` 目录。

## 预览构建产物

```bash
npm run preview
```

## Demo 流程

1. 在首页点击一个商品卡片。
2. 在详情页查看商品信息，点击 `View pickup & reserve`。
3. 在取货预览页点击 `Pickup Instructions` 查看取货说明。
4. 点击 `Reserve for ...` 进入结账页。
5. 选择支付方式。
6. 可输入优惠码 `SAVE10`，点击 `Apply` 应用折扣。
7. 点击 `Place order` 完成购买。
8. 购买成功后可点击 `View order` 查看订单。

## 技术栈

- React
- Vite
- lucide-react
- CSS
