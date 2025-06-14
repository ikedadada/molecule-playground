# プロジェクト計画書 ― Molecule Playground

## 1. プロジェクト概要

- **目的**: 元素カードをドラッグ&ドロップすると、Three.js 上で “ふわふわ” 浮かぶ原子球が自動的に結合し、代表的な化合物（H₂O、CO₂ など）がビジュアル生成される学習兼デモ Web アプリを開発する。
- **特徴**
  - **完全静的ホスティング** (S3 + CloudFront) 等でサーバ不要で運用できること
  - **初回 LCP < 1 s**、島（Three.js）部分のみ Hydration
  - URL パラメータで分子を共有可能
  - 拡張は JSON 追加だけで完結

## 2. スコープ (MVP)

| 区分       | 内容                                                    |
| ---------- | ------------------------------------------------------- |
| 対応元素   | H, O, C, N, Na, Cl, S ほか計 20 種程度                  |
| 対応化合物 | 水、二酸化炭素、メタン、エタノール、NaCl ほか計 30 種   |
| 操作       | 周期表 → ワークスペースへドラッグ → 自動スナップ結合    |
| 表示       | 原子球の Float アニメ + Bloom、ContactShadow で質感付与 |
| 共有       | URL クエリ `?mol=H2O` で状態復元                        |
| データ管理 | `public/compounds.json` に化合物定義を保持              |

## 3. 技術スタック

- **フロント**: Vite + React 19 + React Router v7 (Framework Mode)
- **3D 表現**: react-three/fiber, drei, @react-spring/three
- **ビルド/SSR**
  - 開発時は `ssr:true` で Streaming SSR
  - 本番は `ssr:false` で完全 SSG 出力
- **パフォーマンス**
  - Island Hydration（Three.js 部分のみ JS 70 KB）
  - InstancedMesh で 1 000 原子でも 60 fps
- **PWA**: Workbox によるオフラインキャッシュ（任意）

## 4. データモデル (compounds.json 抜粋)

```json
{
  "H2O": {
    "displayName": "Water",
    "formula": { "H": 2, "O": 1 },
    "layout": [
      { "element": "O", "x": 0, "y": 0 },
      { "element": "H", "x": 1, "y": 0.7 },
      { "element": "H", "x": -1, "y": 0.7 }
    ],
    "props": { "meltingPoint": 0, "boilingPoint": 100 }
  }
}
```

## 5. 画面・UX フロー

1. **トップ (SSR)**: SVG 周期表を即描画（JS 0 KB）
2. **ビルダー (Client Island)**: Three.js Canvas、ドラッグ&ドロップ領域
3. **結合確定**: `matchCompound()` で JSON 照合 → バッジ表示
4. **共有**: 生成後に URL を更新しコピー UI 表示

## 6. 非機能要件

| 指標           | 目標値                      |
| -------------- | --------------------------- |
| 初回 LCP       | 1 s 未満（デスクトップ 3G） |
| 遷移 TTI       | 200 ms 未満                 |
| FPS            | 60 fps（≦ 1 000 原子）      |
| バンドルサイズ | 初期 JS ≤ 100 KB (gzip)     |

## 7. マイルストーン & 期間（合計 6 週間）

| 週  | 作業内容                                     | 成果物                     |
| --- | -------------------------------------------- | -------------------------- |
| 1   | プロジェクト初期化／Vite + RRv7 雛形作成     | 最小表示 OK                |
| 2   | 周期表 SVG／ルーティング整備                 | トップ SSR 完了            |
| 3   | Three.js シーン／Atom モデル実装             | 基本描画 & Float アニメ    |
| 4   | ドラッグ&ドロップ／結合ロジック              | H₂O 結合デモ OK            |
| 5   | compounds.json 拡充／UI polish               | 30 種対応・共有 URL        |
| 6   | パフォーマンス調整／Lighthouse 95+／デプロイ | 本番公開 (S3 + CloudFront) |

## 8. リスクと対策

| リスク                | 影響         | 対策                                              |
| --------------------- | ------------ | ------------------------------------------------- |
| Three.js バンドル肥大 | 初期 JS 増大 | dynamic import + tree-shaking、インスタンス化活用 |
| 旧端末で FPS 低下     | UX 低下      | devicePixelRatio 検知で LOD 切替／Canvas fallback |
| JSON 管理肥大         | 保守コスト増 | スクリプトで CSV → JSON 自動変換を用意            |

## 9. 今後の拡張案

- 有機分子テンプレート追加、SMILES インポート
- WebRTC でリアルタイム協同モード
- WASM 量子化学計算による振動アニメ
- 教材モード：危険度や用途クイズ自動生成
