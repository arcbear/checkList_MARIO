import { useState, useEffect, useMemo } from "react";

const P_SWITCHES = [
  // サンサンさばく (1-15)
  { id: 1, area: "サンサンさばく", title: "サンサンとことこだいこうしん" },
  { id: 2, area: "サンサンさばく", title: "ロープをたどって、こだいいせきの青コイン" },
  { id: 3, area: "サンサンさばく", title: "とんでとんで！とびこんで" },
  { id: 4, area: "サンサンさばく", title: "おいかけてトコトコ" },
  { id: 5, area: "サンサンさばく", title: "むせる！ファイアスネークとびかうトンネル" },
  { id: 6, area: "サンサンさばく", title: "ホットラリー！さばくのたいきゅうレース" },
  { id: 7, area: "サンサンさばく", title: "れきしロマン！いにしえのなんぱせん" },
  { id: 8, area: "サンサンさばく", title: "さばくもなんのその！ばくそうトレーラー" },
  { id: 9, area: "サンサンさばく", title: "とびつけ！ゴールポール" },
  { id: 10, area: "サンサンさばく", title: "ドカンととびだせ！ガケのぼり" },
  { id: 11, area: "サンサンさばく", title: "ひみつのテク！はしらにとびつき さらにとぶ" },
  { id: 12, area: "サンサンさばく", title: "しんてんちへ！さばくからのだっしゅつ" },
  { id: 13, area: "サンサンさばく", title: "はしりぬけろ！すなのおおうなばら" },
  { id: 14, area: "サンサンさばく", title: "すなのうみ！こだいの青コイン" },
  { id: 15, area: "サンサンさばく", title: "ライドオン！さばくのそらの青コイン" },
  // ヘイホーカーニバル (16-39)
  { id: 16, area: "ヘイホーカーニバル", title: "せんろにのって ながいながいさばくのたび" },
  { id: 17, area: "ヘイホーカーニバル", title: "サンボのサンバはボサノバさ" },
  { id: 18, area: "ヘイホーカーニバル", title: "みきわめろ！ダッシュキノコのつかいどころ" },
  { id: 19, area: "ヘイホーカーニバル", title: "ライドオン！たつまきをかいひせよ" },
  { id: 20, area: "ヘイホーカーニバル", title: "ひろって！さばくの青コイン" },
  { id: 21, area: "ヘイホーカーニバル", title: "とびいり！さばくのマラソンたいかい" },
  { id: 22, area: "ヘイホーカーニバル", title: "パタドンのとおせんぼう" },
  { id: 23, area: "ヘイホーカーニバル", title: "あめだ！コインだ！ゴールドラッシュ！" },
  { id: 24, area: "ヘイホーカーニバル", title: "おかいもの！バザールの青コイン" },
  { id: 25, area: "ヘイホーカーニバル", title: "ヘイホーカーニバルマスター 😂" },
  { id: 26, area: "ヘイホーカーニバル", title: "しのびこめ！がいへきをつたって" },
  { id: 27, area: "ヘイホーカーニバル", title: "くずしてすすめ！ブロックめいろ" },
  { id: 28, area: "ヘイホーカーニバル", title: "ヘイホーチャレンジ！レベル1" },
  { id: 29, area: "ヘイホーカーニバル", title: "ヘイホーチャレンジ！レベル2" },
  { id: 30, area: "ヘイホーカーニバル", title: "ヘイホーチャレンジ！レベル3" },
  { id: 31, area: "ヘイホーカーニバル", title: "とっぱせよ！ハンマーブロスのふうさせん" },
  { id: 32, area: "ヘイホーカーニバル", title: "ライドオン！うみへのだっしゅつ" },
  { id: 33, area: "ヘイホーカーニバル", title: "おいつけ！おいこせ！かわのぼりたいけつ" },
  { id: 34, area: "ヘイホーカーニバル", title: "ちょっとすずしい！オアシスの青コイン" },
  { id: 35, area: "ヘイホーカーニバル", title: "のみこまれるな！りゅうさの青コイン" },
  { id: 36, area: "ヘイホーカーニバル", title: "ワンワンゴロゴロやまのぼり" },
  { id: 37, area: "ヘイホーカーニバル", title: "おとされるな！くうちゅうカーブ" },
  { id: 38, area: "ヘイホーカーニバル", title: "くぐって！かわして！りゅうさの青コイン" },
  { id: 39, area: "ヘイホーカーニバル", title: "きめろトリック！さばくにかけるはし" },
  // キラーシップ (40-46)
  { id: 40, area: "キラーシップ", title: "カクバッタンのカクカクロード" },
  { id: 41, area: "キラーシップ", title: "のりつげ！キラーシップへのちかみち" },
  { id: 42, area: "キラーシップ", title: "かけあがれ！がれきのさかの青コイン" },
  { id: 43, area: "キラーシップ", title: "うでだめし！ドリフトコントロール" },
  { id: 44, area: "キラーシップ", title: "ぜんいんしゅうごう！たちふさがるプー" },
  { id: 45, area: "キラーシップ", title: "てかげんなし！キラーシップタイムトライアル😂", hard: true },
  { id: 46, area: "キラーシップ", title: "チャレンジ！ホールインワン" },
  // クッパキャッスル (47-64)
  { id: 47, area: "クッパキャッスル", title: "スパイシー！フードコーナーの青コイン😂" },
  { id: 48, area: "クッパキャッスル", title: "たぎるクッパぐんだん！たいきゅうレース" },
  { id: 49, area: "クッパキャッスル", title: "ホップ ステップ クッパキャッスル" },
  { id: 50, area: "クッパキャッスル", title: "にえたぎるマグマ！げきあつスタント" },
  { id: 51, area: "クッパキャッスル", title: "ライドオン！かざんからのだっしゅつ" },
  { id: 52, area: "クッパキャッスル", title: "たべほうだい！ビッグドーナツぐるぐるレース" },
  { id: 53, area: "クッパキャッスル", title: "よけろドンケツ！ビッグドーナツの青コイン" },
  { id: 54, area: "クッパキャッスル", title: "キノコあり！みぎからロッククライミング" },
  { id: 55, area: "クッパキャッスル", title: "うちやぶれ！ふりそそぐかざんだん" },
  { id: 56, area: "クッパキャッスル", title: "かわせドッスン！マグマのはしの青コイン" },
  { id: 57, area: "クッパキャッスル", title: "キノコなし！ひだりからロッククライミング" },
  { id: 58, area: "クッパキャッスル", title: "いまからほんきだす！ファイアブロス" },
  { id: 59, area: "クッパキャッスル", title: "しんちょうに！ほそみちをわたる青コイン" },
  { id: 60, area: "クッパキャッスル", title: "チャレンジ！パイプスラローム" },
  { id: 61, area: "クッパキャッスル", title: "とびこえろ！ビッグドーナツ" },
  { id: 62, area: "クッパキャッスル", title: "きめろ！じょうへきのれんぞくトリック" },
  { id: 63, area: "クッパキャッスル", title: "ガマンがたいせつ！あつさにまけるな" },
  { id: 64, area: "クッパキャッスル", title: "かけのぼれ！ガボンのじょうへき" },
  // ホネホネツイスター (65-72)
  { id: 65, area: "ホネホネツイスター", title: "よけろひのたま！ホネのひろばの青コイン" },
  { id: 66, area: "ホネホネツイスター", title: "つなわたり！ホネホネツイスターの青コイン" },
  { id: 67, area: "ホネホネツイスター", title: "れんしゅう！ウォールランのルート" },
  { id: 68, area: "ホネホネツイスター", title: "どすこい！カミナリにごようじん" },
  { id: 69, area: "ホネホネツイスター", title: "しゅつげん！おんせんのかんけつせん" },
  { id: 70, area: "ホネホネツイスター", title: "さがせ！ゆけむり青コイン" },
  { id: 71, area: "ホネホネツイスター", title: "でるとウワサの…はかばの青コイン" },
  { id: 72, area: "ホネホネツイスター", title: "だいこんざつ！カロンのホコテン" },
  // ワリオスタジアム (73-85)
  { id: 73, area: "ワリオスタジアム", title: "デンジャラス！アクロバットひのわくぐり" },
  { id: 74, area: "ワリオスタジアム", title: "おいこせ！トラスきょうのれっしゃ" },
  { id: 75, area: "ワリオスタジアム", title: "とびはねろ！おくじょうアップダウン" },
  { id: 76, area: "ワリオスタジアム", title: "たかとび！ワリオスタジアムの青コイン" },
  { id: 77, area: "ワリオスタジアム", title: "タイヤづくし！タイヤトライアル" },
  { id: 78, area: "ワリオスタジアム", title: "クロスカントリー！こうやのたいきゅうレース" },
  { id: 79, area: "ワリオスタジアム", title: "とびいり！ヘイホーのかわくだりフェスティバル" },
  { id: 80, area: "ワリオスタジアム", title: "ひのようじん！ファイアパックンロード" },
  { id: 81, area: "ワリオスタジアム", title: "てっこつわたり！こわれたブリッジ" },
  { id: 82, area: "ワリオスタジアム", title: "よけろ！タイヤゴローぐんだん" },
  { id: 83, area: "ワリオスタジアム", title: "とびうつれ！てっとうチョロボンつなわたり" },
  { id: 84, area: "ワリオスタジアム", title: "なんでもけちらす！ばくそうトレーラー" },
  { id: 85, area: "ワリオスタジアム", title: "とべ！てっこつのすきま" },
  // マリオサーキット (86-102)
  { id: 86, area: "マリオサーキット", title: "いっぱつしょうぶ！クォーターパイプジャンプ" },
  { id: 87, area: "マリオサーキット", title: "のぼって！コントロールタワーの青コイン" },
  { id: 88, area: "マリオサーキット", title: "のぼろう！カラーブロックのスラックライン" },
  { id: 89, area: "マリオサーキット", title: "ほしをひろって！シャボンだまリバー" },
  { id: 90, area: "マリオサーキット", title: "ごあんぜんに！ショーニューロードへの青コイン" },
  { id: 91, area: "マリオサーキット", title: "はねたりとんだり！パックンはらっぱ" },
  { id: 92, area: "マリオサーキット", title: "めざせ！マリオカートのたかだい" },
  { id: 93, area: "マリオサーキット", title: "とびこせ！でっかいマリオ" },
  { id: 94, area: "マリオサーキット", title: "じっせん！タイムアタックきょうしゅうじょ❓" },
  { id: 95, area: "マリオサーキット", title: "とびこえろ！マリオサーキット" },
  { id: 96, area: "マリオサーキット", title: "あらぶる！ブルたちのトラブル" },
  { id: 97, area: "マリオサーキット", title: "くぐってダッシュ！シンゴウムシ" },
  { id: 98, area: "マリオサーキット", title: "はえるツタパックン！みどりのおかをこえて" },
  { id: 99, area: "マリオサーキット", title: "そこのガボン！とまりなさい！" },
  { id: 100, area: "マリオサーキット", title: "レジャースポット！もりのアドベンチャー" },
  { id: 101, area: "マリオサーキット", title: "おいつけおいこせ！かけぬけろトンネル！" },
  { id: 102, area: "マリオサーキット", title: "とびうつれ！てっとうの青コイン" },
  // シュポポコースター (103-116)
  { id: 103, area: "シュポポコースター", title: "しゅっぱつ！きかんしゃいわタイムトライアル" },
  { id: 104, area: "シュポポコースター", title: "バレルロール！シュポポコースターの青コイン" },
  { id: 105, area: "シュポポコースター", title: "おいこせ！シュポポとっきゅう" },
  { id: 106, area: "シュポポコースター", title: "きりひらけ！ひみつのうらみち" },
  { id: 107, area: "シュポポコースター", title: "たにぞこへダイブ！いのちしらずレース" },
  { id: 108, area: "シュポポコースター", title: "たかくまいあがれ！オーバーザブリッジ" },
  { id: 109, area: "シュポポコースター", title: "スプラッシュ！けいこくのワイルドレース" },
  { id: 110, area: "シュポポコースター", title: "てんけん！しゃりょうきちの青コイン" },
  { id: 111, area: "シュポポコースター", title: "マリオカートのスタッフもビックリ！6😂", hard: true },
  { id: 112, area: "シュポポコースター", title: "きめろウォールラン！もいっちょウォールラン！" },
  { id: 113, area: "シュポポコースター", title: "かわのぼり！シュポポコースターのたにま" },
  { id: 114, area: "シュポポコースター", title: "てっこつピョンピョン！ワイルドやまわたり" },
  { id: 115, area: "シュポポコースター", title: "どかんでドカン！こうやの青コイン" },
  { id: 116, area: "シュポポコースター", title: "スーパースタント！こうやにかけるはし" },
  // DKうちゅうセンター (117-127)
  { id: 117, area: "DKうちゅうセンター", title: "とびうつれ！はっしゃだいの青コイン" },
  { id: 118, area: "DKうちゅうセンター", title: "リメンバー！DONKEY KONG" },
  { id: 119, area: "DKうちゅうセンター", title: "リハーサル！DKうちゅうセンター" },
  { id: 120, area: "DKうちゅうセンター", title: "スタンバイ！ひこうきにのってシティまで" },
  { id: 121, area: "DKうちゅうセンター", title: "ばくはつ！カウントダウン" },
  { id: 122, area: "DKうちゅうセンター", title: "せいみつそうさ！うちゅうセンターの青コイン" },
  { id: 123, area: "DKうちゅうセンター", title: "うちゅうセンターでカースタント！" },
  { id: 124, area: "DKうちゅうセンター", title: "ならせクラクション！ひろえ青コイン" },
  { id: 125, area: "DKうちゅうセンター", title: "のりかえろ！ばくそうトレーラー" },
  { id: 126, area: "DKうちゅうセンター", title: "えがけはちのじ！ガボンの青コイン" },
  { id: 127, area: "DKうちゅうセンター", title: "ちょっこうびん！ひみつのタルたいほう" },
  // トロフィーシティ (128-150)
  { id: 128, area: "トロフィーシティ", title: "まちじゅうかけめぐる！シティたいきゅうレース" },
  { id: 129, area: "トロフィーシティ", title: "トロフィーシティーでパルクール！" },
  { id: 130, area: "トロフィーシティ", title: "あそびにきたよ！とおくジャングルから" },
  { id: 131, area: "トロフィーシティ", title: "みせろハンドルさばき！パークの青コイン" },
  { id: 132, area: "トロフィーシティ", title: "のびろ！えいこうにむかって" },
  { id: 133, area: "トロフィーシティ", title: "きめろ！ダイナミックちゅうしゃ" },
  { id: 134, area: "トロフィーシティ", title: "かけおりろ！ちゅうしゃじょうでのドリフト" },
  { id: 135, area: "トロフィーシティ", title: "クッパぐんだんあらわる！トロフィーシティのきき" },
  { id: 136, area: "トロフィーシティ", title: "青コインひろってドーナツ屋さんにいこう" },
  { id: 137, area: "トロフィーシティ", title: "ついせき！おってけヘリコプター" },
  { id: 138, area: "トロフィーシティ", title: "のぼってみよう！みはらしのよい丘" },
  { id: 139, area: "トロフィーシティ", title: "どんぶらこ！ながれながされてシティ" },
  { id: 140, area: "トロフィーシティ", title: "やねをつたって！アーバンな青コイン" },
  { id: 141, area: "トロフィーシティ", title: "ダッシュ！ダッシュ！はんトンネル" },
  { id: 142, area: "トロフィーシティ", title: "マリオカートスタッフもビックリ！1😂", hard: true },
  { id: 143, area: "トロフィーシティ", title: "のんびり サバーブなさんぽみち" },
  { id: 144, area: "トロフィーシティ", title: "おいこせ！シティいきエクスプレス" },
  { id: 145, area: "トロフィーシティ", title: "みつけたぞ！ヤドパイロンのかくれが" },
  { id: 146, area: "トロフィーシティ", title: "めざせ！あこがれのアーバンビーチ" },
  { id: 147, area: "トロフィーシティ", title: "テクニカル！ブリッジの青コイン" },
  { id: 148, area: "トロフィーシティ", title: "クラゲがおでむかえ！ノコノコビーチ" },
  { id: 149, area: "トロフィーシティ", title: "クジラがおでむかえ！ピーチスタジアム" },
  { id: 150, area: "トロフィーシティ", title: "スーパースタント！オンザブリッジ！" },
  // チョコマウンテン (151-159)
  { id: 151, area: "チョコマウンテン", title: "メモリアルレース！チョコレーとう2" },
  { id: 152, area: "チョコマウンテン", title: "チョコにしずむな！ダッシュダッシュ！" },
  { id: 153, area: "チョコマウンテン", title: "らくせきならぬ らくチョコちゅうい！" },
  { id: 154, area: "チョコマウンテン", title: "とりほうだい？コインまみれの青コイン" },
  { id: 155, area: "チョコマウンテン", title: "だいたんふてき！てっこつショートカット" },
  { id: 156, area: "チョコマウンテン", title: "ここもはしれる！のりめんマスター" },
  { id: 157, area: "チョコマウンテン", title: "かいたく！チョコマウンテンへのちかみち" },
  { id: 158, area: "チョコマウンテン", title: "メモリアルレース！チョコレーとう1" },
  { id: 159, area: "チョコマウンテン", title: "しずまぬスター！マッドなチキンレース" },
  // キノピオファクトリー (160-170)
  { id: 160, area: "キノピオファクトリー", title: "ライドオン！だれもじゃまできないぜ" },
  { id: 161, area: "キノピオファクトリー", title: "リズムよく！おんぷブロックジャンピング" },
  { id: 162, area: "キノピオファクトリー", title: "マリオカートスタッフもビックリ！2😂", hard: true },
  { id: 163, area: "キノピオファクトリー", title: "ごきょうりょくください！しさくひんテスト" },
  { id: 164, area: "キノピオファクトリー", title: "ようこそ！キノピオファクトリー" },
  { id: 165, area: "キノピオファクトリー", title: "かけあがれ！おくじょうクレーン" },
  { id: 166, area: "キノピオファクトリー", title: "いったりきたり！レールの上の青コイン" },
  { id: 167, area: "キノピオファクトリー", title: "のぼってクレーン！よけてクレーン！" },
  { id: 168, area: "キノピオファクトリー", title: "ひろって！こうかしたの青コイン" },
  { id: 169, area: "キノピオファクトリー", title: "はねてわたって！かんばんの青コイン" },
  { id: 170, area: "キノピオファクトリー", title: "めざせおんせん！ホネまでしみるぞ" },
  // どんぐりツリーハウス (171-183)
  { id: 171, area: "どんぐりツリーハウス", title: "とびうつれ！スズランをたどる青コイン" },
  { id: 172, area: "どんぐりツリーハウス", title: "さかのぼれ！ハナチャンラッシュアワー" },
  { id: 173, area: "どんぐりツリーハウス", title: "よけてあげて！のんびりヘラジカ" },
  { id: 174, area: "どんぐりツリーハウス", title: "ぐんぐんのびる！ツタパックン" },
  { id: 175, area: "どんぐりツリーハウス", title: "ほうさく！どんぐりあめあられ" },
  { id: 176, area: "どんぐりツリーハウス", title: "ながれにさからえ！スピードトライアル" },
  { id: 177, area: "どんぐりツリーハウス", title: "のぼっておりて！だいかいだんの青コイン😂" },
  { id: 178, area: "どんぐりツリーハウス", title: "キャンプにおすすめ！かわのほとりの青コイン" },
  { id: 179, area: "どんぐりツリーハウス", title: "タイムトライアル！もりのワイルドレース" },
  { id: 180, area: "どんぐりツリーハウス", title: "りったいこうさ！はちのじ青コイン" },
  { id: 181, area: "どんぐりツリーハウス", title: "ハナチャンお気に入り！さんぽみちの青コイン" },
  { id: 182, area: "どんぐりツリーハウス", title: "スイムスイム！メンボのみずばの青コイン" },
  { id: 183, area: "どんぐりツリーハウス", title: "はばたけ！きょだいリンゴをめざして" },
  // マリオブラザーズサーキット (184-205)
  { id: 184, area: "マリオブラザーズサーキット", title: "レールスライド！きょだいバーガーの青コイン" },
  { id: 185, area: "マリオブラザーズサーキット", title: "とびうつれ！かんきゃくせき" },
  { id: 186, area: "マリオブラザーズサーキット", title: "アイテムできりひらけ！さばくへのたびじ" },
  { id: 187, area: "マリオブラザーズサーキット", title: "とびつけ！えきのゴールポール" },
  { id: 188, area: "マリオブラザーズサーキット", title: "よろしく！ヨッシーズ" },
  { id: 189, area: "マリオブラザーズサーキット", title: "とびつけ！サボテンでポールジャンプ" },
  { id: 190, area: "マリオブラザーズサーキット", title: "こうりゃく！ワリオスタジアムへのちかみち" },
  { id: 191, area: "マリオブラザーズサーキット", title: "けものみち！アルマジロのなわばり" },
  { id: 192, area: "マリオブラザーズサーキット", title: "キノコのごりようはけいかくてきに！" },
  { id: 193, area: "マリオブラザーズサーキット", title: "くぐって！ブリッジのてっこつ" },
  { id: 194, area: "マリオブラザーズサーキット", title: "アーチをえがけ！てっきょうの青コイン" },
  { id: 195, area: "マリオブラザーズサーキット", title: "きめろ！こうやのウルトラC" },
  { id: 196, area: "マリオブラザーズサーキット", title: "ひたはしれ！サーキットへのちかみち" },
  { id: 197, area: "マリオブラザーズサーキット", title: "バーガーたべほうだい！まんぷくコース" },
  { id: 198, area: "マリオブラザーズサーキット", title: "かるわざ！モーテルの青コイン" },
  { id: 199, area: "マリオブラザーズサーキット", title: "ブルっちまうぜ！アメフトもうとっくん" },
  { id: 200, area: "マリオブラザーズサーキット", title: "めざせ！せかいさいだいのキノコのてっぺん" },
  { id: 201, area: "マリオブラザーズサーキット", title: "よーい、アクション！ばくそうトレーラー" },
  { id: 202, area: "マリオブラザーズサーキット", title: "すべてをふきとばす！こうやのたつまき" },
  { id: 203, area: "マリオブラザーズサーキット", title: "ぜっぺき！キノロックのいただきレース" },
  { id: 204, area: "マリオブラザーズサーキット", title: "とびこえろ！たちはだかる大きなガケ" },
  { id: 205, area: "マリオブラザーズサーキット", title: "かわせクリボー！はしのしたの青コイン" },
  // モーモーカントリー (206-216)
  { id: 206, area: "モーモーカントリー", title: "どこにいくのかな？ぎゅうしゃの青コイン" },
  { id: 207, area: "モーモーカントリー", title: "ドカンといこうぜ！ぼくじょうジャンパー" },
  { id: 208, area: "モーモーカントリー", title: "ぼくじょうはギューギューづめ！" },
  { id: 209, area: "モーモーカントリー", title: "はねて！おりて！いったりきたりの青コイン" },
  { id: 210, area: "モーモーカントリー", title: "ジャンプジャンプ！とうげみちタイムトライアル" },
  { id: 211, area: "モーモーカントリー", title: "ダッシュ！ジャンプ！そうげんのかわのぼり" },
  { id: 212, area: "モーモーカントリー", title: "とんで！くぐって！かわのぼり" },
  { id: 213, area: "モーモーカントリー", title: "アオコインヲ スイコムノダ…" },
  { id: 214, area: "モーモーカントリー", title: "かけぬけろ！スターのみずうみへ" },
  { id: 215, area: "モーモーカントリー", title: "おいかけて！このボコボコつちはいったい…？" },
  { id: 216, area: "モーモーカントリー", title: "スタンバイ…さいごにとびつく青コイン" },
  // ピーチスタジアム (217-229)
  { id: 217, area: "ピーチスタジアム", title: "くじけるな！ゲートのうえにのぼるんだ" },
  { id: 218, area: "ピーチスタジアム", title: "そらとぶ！ピーチスタジアムかんこうツアー" },
  { id: 219, area: "ピーチスタジアム", title: "タワーをぐるり！ピーチスタジアムの青コイン" },
  { id: 220, area: "ピーチスタジアム", title: "きょうはドッグランのかいほうびなんですよ〜" },
  { id: 221, area: "ピーチスタジアム", title: "ピーチスタジアム うらにわの青コイン" },
  { id: 222, area: "ピーチスタジアム", title: "とびこえろ！スターのみずうみ" },
  { id: 223, area: "ピーチスタジアム", title: "アスレチック！スターのみずうみ" },
  { id: 224, area: "ピーチスタジアム", title: "とんだりはねたり！ピーチスタジアムのていえん" },
  { id: 225, area: "ピーチスタジアム", title: "しゅうかく！パタテンテンの青コイン" },
  { id: 226, area: "ピーチスタジアム", title: "むらおこし！キノコのむらのくさレース" },
  { id: 227, area: "ピーチスタジアム", title: "どかんをたどって！おんぷブロックの青コイン" },
  { id: 228, area: "ピーチスタジアム", title: "びちょうせい！せんさいなフライト😂" },
  { id: 229, area: "ピーチスタジアム", title: "およげ！はちのじタイムトライアル😂" },
  // ノコノコビーチ (230-235)
  { id: 230, area: "ノコノコビーチ", title: "ロープをたどって！ビーチのたかみへ" },
  { id: 231, area: "ノコノコビーチ", title: "およぎきれ！はるかとおいシティまで" },
  { id: 232, area: "ノコノコビーチ", title: "メモリアルレース！ノコノコビーチ1" },
  { id: 233, area: "ノコノコビーチ", title: "すいじょうアスレチック！うかぶ青コイン" },
  { id: 234, area: "ノコノコビーチ", title: "おサカナかきわけ ブリッジのはまべまで" },
  { id: 235, area: "ノコノコビーチ", title: "キャッキャウフフ！すなはまレース" },
  // ディノディノジャングル (236-246)
  { id: 236, area: "ディノディノジャングル", title: "たよりになる！おおきいせなか" },
  { id: 237, area: "ディノディノジャングル", title: "フライト！ドームをふきぬけるかぜ" },
  { id: 238, area: "ディノディノジャングル", title: "マリオカートスタッフもビックリ！4😭", hard: true },
  { id: 239, area: "ディノディノジャングル", title: "いのちしらず！なわばりの青コイン" },
  { id: 240, area: "ディノディノジャングル", title: "のぼってみよう！ジャングルのぐるぐるやま" },
  { id: 241, area: "ディノディノジャングル", title: "オーバーラン！トリケラトプスのあたま" },
  { id: 242, area: "ディノディノジャングル", title: "にげきれ！ワイルドきょうりゅうレース" },
  { id: 243, area: "ディノディノジャングル", title: "つっきれ！きょうりゅうだらけのジャングル" },
  { id: 244, area: "ディノディノジャングル", title: "おおたきめざして！サバンナゆうらんひこう" },
  { id: 245, area: "ディノディノジャングル", title: "パックンもほしがる！みわくの青コイン" },
  { id: 246, area: "ディノディノジャングル", title: "のってみて！ブラキオサウルスのながいせなか" },
  // リバーサイドサファリ (247-268)
  { id: 247, area: "リバーサイドサファリ", title: "どんぶらこマックス！キケンなたきわたり" },
  { id: 248, area: "リバーサイドサファリ", title: "くもをこえて！てんたかくジャンプ" },
  { id: 249, area: "リバーサイドサファリ", title: "ようこそ！リバーサイドの青コイン" },
  { id: 250, area: "リバーサイドサファリ", title: "どう おりかえす…？つりばしの青コイン" },
  { id: 251, area: "リバーサイドサファリ", title: "くるものこばまず！サバンナたいきゅうレース" },
  { id: 252, area: "リバーサイドサファリ", title: "サバンナおうだん！ロックジャンピング" },
  { id: 253, area: "リバーサイドサファリ", title: "バッファロースクランブル" },
  { id: 254, area: "リバーサイドサファリ", title: "ワニさんありがとう！サファリへのちかみち" },
  { id: 255, area: "リバーサイドサファリ", title: "青コインがみちびく！シークレットライン" },
  { id: 256, area: "リバーサイドサファリ", title: "ぜんそくりょく！キリンロードの青コイン" },
  { id: 257, area: "リバーサイドサファリ", title: "おじゃまします！かわくだりツアー" },
  { id: 258, area: "リバーサイドサファリ", title: "ごうかい！おおたきウォールラン" },
  { id: 259, area: "リバーサイドサファリ", title: "たきをとびこえ きょだいブロック" },
  { id: 260, area: "リバーサイドサファリ", title: "ゾウさんで とびはねるぞう〜" },
  { id: 261, area: "リバーサイドサファリ", title: "シマウマラッシュ！" },
  { id: 262, area: "リバーサイドサファリ", title: "みせろスタント！かれいなハネさばき" },
  { id: 263, area: "リバーサイドサファリ", title: "ひるまずグライド！ティラノのほうこう" },
  { id: 264, area: "リバーサイドサファリ", title: "おいつけ！ぼうそうトレーラー" },
  { id: 265, area: "リバーサイドサファリ", title: "アドベンチャー！たにまのグライダー" },
  { id: 266, area: "リバーサイドサファリ", title: "ワニさんのおくちで ボヨヨン青コイン" },
  { id: 267, area: "リバーサイドサファリ", title: "おんせんがわいたぞ！みんなあつまれ青コイン" },
  { id: 268, area: "リバーサイドサファリ", title: "プクプクもウズウズ！うずしおの青コイン" },
  // プクプクフォールズ (269-282)
  { id: 269, area: "プクプクフォールズ", title: "いしのにわ なんとみやびな あおこいん" },
  { id: 270, area: "プクプクフォールズ", title: "ぷくぷくの ねがいかなえる たきのぼり" },
  { id: 271, area: "プクプクフォールズ", title: "つりがねを ならしてごらん あきのそら" },
  { id: 272, area: "プクプクフォールズ", title: "もみじまいちる せんろきょうの青コイン" },
  { id: 273, area: "プクプクフォールズ", title: "とうげには キケンがいっぱい！" },
  { id: 274, area: "プクプクフォールズ", title: "とうげもおかまいなし！ ばくそうトレーラー" },
  { id: 275, area: "プクプクフォールズ", title: "かわくだり！あきのけしきに青コイン" },
  { id: 276, area: "プクプクフォールズ", title: "わっかをくぐって！マントガメのおとしもの" },
  { id: 277, area: "プクプクフォールズ", title: "あなたのおもいどおりに！のばせツタパックン" },
  { id: 278, area: "プクプクフォールズ", title: "ふきとばせ！ぼくそうロールの青コイン" },
  { id: 279, area: "プクプクフォールズ", title: "とびたとう！プクプクフォールズへのうらみち" },
  { id: 280, area: "プクプクフォールズ", title: "デンジャラス！ダイナミックじょうしゃ" },
  { id: 281, area: "プクプクフォールズ", title: "どすん！ばたん！いしがきの青コイン" },
  { id: 282, area: "プクプクフォールズ", title: "タツノンあらわる！おほりのレース" },
  // ショーニューロード (283-290)
  { id: 283, area: "ショーニューロード", title: "とびうつれ！れんぞくジャンピン" },
  { id: 284, area: "ショーニューロード", title: "かけあがれ！パタテンテンブリッジ" },
  { id: 285, area: "ショーニューロード", title: "マリオカートスタッフもビックリ！3😭", hard: true },
  { id: 286, area: "ショーニューロード", title: "しんぴてき！リムストーンプールの青コイン" },
  { id: 287, area: "ショーニューロード", title: "いまならのぼれる！あのやまのうえ😭" },
  { id: 288, area: "ショーニューロード", title: "めしあがれ！ヨッシーズのデリバリー" },
  { id: 289, area: "ショーニューロード", title: "いそげ！かわらのクルマをのりついで" },
  { id: 290, area: "ショーニューロード", title: "つなわたり！スラックラインの青コイン" },
  // おばけシネマ (291-300)
  { id: 291, area: "おばけシネマ", title: "よーいアクション！カメラクレーンの青コイン" },
  { id: 292, area: "おばけシネマ", title: "とびこめ！フィルムのせかい" },
  { id: 293, area: "おばけシネマ", title: "3Dシネマ！？パニックムービーレース" },
  { id: 294, area: "おばけシネマ", title: "とびうつれ！えいがかんのレールスライド" },
  { id: 295, area: "おばけシネマ", title: "メモリアルレース！おばけぬま1" },
  { id: 296, area: "おばけシネマ", title: "メモリアルレース！おばけぬま2" },
  { id: 297, area: "おばけシネマ", title: "メモリアルレース！おばけぬま3" },
  { id: 298, area: "おばけシネマ", title: "かけぬけろ！はしからはしまで おばけぬま" },
  { id: 299, area: "おばけシネマ", title: "とびうつれ！おくのほそみち" },
  { id: 300, area: "おばけシネマ", title: "ぬまもへっちゃら！スターのちから" },
  { id: 301, area: "おばけシネマ", title: "しずまぬうちに！おばけぬまの青コイン" },
  { id: 302, area: "おばけシネマ", title: "いそいでにげて！おばけのさまようもり" },
  { id: 303, area: "おばけシネマ", title: "おそろしや！おばけのもりの青コイン" },
  { id: 304, area: "おばけシネマ", title: "みぎへ ひだりへ ジグザグそうこう" },
  { id: 305, area: "おばけシネマ", title: "きぎのあいまをぬう！せんさいなグライド" },
  { id: 306, area: "おばけシネマ", title: "かわくだり！どんぐりツリーハウスへ" },
  { id: 307, area: "おばけシネマ", title: "とびのれ！でんせんレールスライド" },
  { id: 308, area: "ロゼッタてんもんだい", title: "さいこうほう！てんもんだいの青コイン" },
  { id: 309, area: "ロゼッタてんもんだい", title: "いまからほんきだす！アイスブロス" },
  { id: 310, area: "ロゼッタてんもんだい", title: "げんかい！スピードトライアル" },
  { id: 311, area: "ロゼッタてんもんだい", title: "ショートカット こうじちゅう！" },
  { id: 312, area: "ロゼッタてんもんだい", title: "ぎゃくそう！ペンギンレース" },
  { id: 313, area: "ロゼッタてんもんだい", title: "パワフルにすべれ！クロスカントリー" },
  { id: 314, area: "ロゼッタてんもんだい", title: "ゲレンデみおろす ビッグフライト！" },
  { id: 315, area: "ロゼッタてんもんだい", title: "おうふく！アイスパックンの青コイン" },
  { id: 316, area: "ロゼッタてんもんだい", title: "かけおりろ！ゆきだまとともに" },
  { id: 317, area: "ロゼッタてんもんだい", title: "そらからおいこせ！ゆきみちのれっしゃ" },
  { id: 318, area: "ロゼッタてんもんだい", title: "みんな いそいでいるのかな！？" },
  { id: 319, area: "ロゼッタてんもんだい", title: "パワフルにのぼれ！こおりのさかみち" },
  { id: 320, area: "ロゼッタてんもんだい", title: "ほおばれキノコ！えきまでおおいそぎ" },
  { id: 321, area: "ロゼッタてんもんだい", title: "みせろトリック！ゆきのせんろの青コイン" },
  { id: 322, area: "ロゼッタてんもんだい", title: "みてみて！ゆきだるまサークルの青コイン" },
  { id: 323, area: "アイスビルディング", title: "めざせ！まわるアイスのてっぺん" },
  { id: 324, area: "アイスビルディング", title: "キノコでとっぱ！キャンディのみち" },
  { id: 325, area: "アイスビルディング", title: "だっしゅつ！アイスのビルのたにま" },
  { id: 326, area: "アイスビルディング", title: "ペンギンパレード！すきまをぬって青コイン" },
  { id: 327, area: "アイスビルディング", title: "メモリアルレース！バニラレイク" },
  { id: 328, area: "アイスビルディング", title: "ゆきだまにちゅうい！ふゆのとうげみち" },
  { id: 329, area: "アイスビルディング", title: "スケートれんしゅうちゅうに スミマセン！" },
  { id: 330, area: "アイスビルディング", title: "はかれタイミング！アイスパックンの青コイン" },
  { id: 331, area: "アイスビルディング", title: "ヒンヤリくうちゅうさんぽ！おんぷブロック" },
  { id: 332, area: "アイスビルディング", title: "めざせ！フリーザーロックのてっぺん" },
  { id: 333, area: "DKスノーマウンテン", title: "いまがチャンス！からっぽのスタンド" },
  { id: 334, area: "DKスノーマウンテン", title: "ちべたい！DKスノーマウンテンの青コイン" },
  { id: 335, area: "DKスノーマウンテン", title: "おじゃまします！ヘイホーのスノボたいかい" },
  { id: 336, area: "DKスノーマウンテン", title: "マリオカートスタッフもビックリ！５😭" },
  { id: 337, area: "DKスノーマウンテン", title: "ゆきだまちゅうい！ゲレンデの青コイン" },
  { id: 338, area: "DKスノーマウンテン", title: "スラローム！ゲレンデの青コイン" },
  { id: 339, area: "DKスノーマウンテン", title: "まふゆのサンバ！スノーサンボの青コイン" },
  { id: 340, area: "DKスノーマウンテン", title: "だれよりはやく！じゅうたいをかきわけて" },
  { id: 341, area: "DKスノーマウンテン", title: "おうふく！いたばりスロープの青コイン" },
  { id: 342, area: "DKスノーマウンテン", title: "みがけ！グライドコントロール" },
  { id: 343, area: "DKスノーマウンテン", title: "こごえる！みずうみのアスレチック" },
  { id: 344, area: "DKスノーマウンテン", title: "どうしてもスキーにいきたい！" },
  { id: 345, area: "DKスノーマウンテン", title: "チョロボンにごようじん！でんせんの青コイン" },
  { id: 346, area: "DKスノーマウンテン", title: "れっしゃにまけるな！ゆきのせんろきょう" },
  { id: 347, area: "DKスノーマウンテン", title: "もってけ！ころばぬさきのミドリこうら" },
  { id: 348, area: "DKスノーマウンテン", title: "はなて！ファイアボール" },
  { id: 349, area: "ワリオシップ", title: "おたからさがし！なんぱせんの青コイン" },
  { id: 350, area: "ワリオシップ", title: "たどれ！かがやくコインのみちすじ" },
  { id: 351, area: "ワリオシップ", title: "とびうつれ！とりでからとりでへ" },
  { id: 352, area: "ワリオシップ", title: "ドキドキウズウズ！うずしおの青コイン" },
  { id: 353, area: "ワリオシップ", title: "ひとなつのぼうけん！むじんとうレース" },
  { id: 354, area: "ワリオシップ", title: "バカンスちゅう！クリボーの青コイン" },
  { id: 355, area: "ワリオシップ", title: "ゆうがなバカンス！みなみのしまめぐり" },
  { id: 356, area: "ワリオシップ", title: "うみをこえて！マーメイドのてまねき" },
  { id: 357, area: "ワリオシップ", title: "あらなみ！あらしをよぶ青コイン" },
  { id: 358, area: "ワリオシップ", title: "おねがいタツノン！せなかにのせて" },
  { id: 359, area: "ソルティータウン", title: "おれたちゃ いますぐ うみにいきたいんだYO！" },
  { id: 360, area: "ソルティータウン", title: "うてんけっこう！ボートたいかい" },
  { id: 361, area: "ソルティータウン", title: "アルバイト！うみのいえの青コイン" },
  { id: 362, area: "ソルティータウン", title: "のぼって！おはなのかいだん" },
  { id: 363, area: "ソルティータウン", title: "とびこせ！ふうしゃごや" },
  { id: 364, area: "ソルティータウン", title: "うみにいこう！ふうしゃのおかをこえて" },
  { id: 365, area: "ソルティータウン", title: "ジグザグ！カルストのスラローム" },
  { id: 366, area: "ソルティータウン", title: "いそのかおり！ポイハナの青コイン" },
  { id: 367, area: "ソルティータウン", title: "せなかをかして！うみのたび😭" },
  { id: 368, area: "ソルティータウン", title: "なやましい！みわくのにんぎょの青コイン" },
  { id: 369, area: "ソルティータウン", title: "にもつをよ〜く みきわめて！" },
  { id: 370, area: "ソルティータウン", title: "ぬれずにはしって ショートカット！" },
  { id: 371, area: "ソルティータウン", title: "ソルティータウンで パルクール！" },
  { id: 372, area: "ソルティータウン", title: "アスレチック！どかんとブロックのほそみち" },
  { id: 373, area: "ソルティータウン", title: "とんだりはねたり！みずをえたうお" },
  { id: 374, area: "ソルティータウン", title: "とっぱせよ！ブーメランブロスのふうさせん" },
  { id: 375, area: "ソルティータウン", title: "だんがいぜっぺき！のりこえられたらハネマスター" },
  { id: 376, area: "ソルティータウン", title: "ドキドキ！がけっぷちあみだクジ" },
  { id: 377, area: "ソルティータウン", title: "とっくん！みずのうえのコントロール" },
  { id: 378, area: "ソルティータウン", title: "よ〜くねらって！パラソルの青コイン" },
  { id: 379, area: "ソルティータウン", title: "はばたけ！ソルティータウンへのちかみち" },
  { id: 380, area: "ソルティータウン", title: "チョーチンスラロームリーフ" },
  { id: 381, area: "ソルティータウン", title: "とびこめ！ふぶきのたつまき" },
  { id: 382, area: "ハテナしんでん", title: "めうつりしないで！おうごんきょうの青コイン" },
  { id: 383, area: "ハテナしんでん", title: "あふれるロマン！いにしえのくうちゅうさんぽ" },
  { id: 384, area: "ハテナしんでん", title: "ボヨヨンはねて くものうえ" },
  { id: 385, area: "ハテナしんでん", title: "とびうつれ！きょだいブロックのとびち" },
  { id: 386, area: "ハテナしんでん", title: "しんぴ！あのきょだいブロックのうえへ" },
  { id: 387, area: "ハテナしんでん", title: "とびうつれ！ツタパックンの青コイン" },
  { id: 388, area: "ハテナしんでん", title: "とびだせ！サバンナのそらの青コイン" },
  { id: 389, area: "ハテナしんでん", title: "ゆうきをだして！とびこみジャンプ" },
  { id: 390, area: "ハテナしんでん", title: "ジャングルツアー！てつどうの青コイン" },
  { id: 391, area: "ハテナしんでん", title: "ツタパックンがみちびく！いせきの青コイン" },
  { id: 392, area: "ピーチビーチ", title: "もったいない！ひろってダッシュキノコ" },
  { id: 393, area: "ピーチビーチ", title: "めざせ！とくとうせきのてっぺん" },
  { id: 394, area: "ピーチビーチ", title: "すいじょうバイク トレーニングちゅう！" },
];

const AREA_COLORS = {
  "サンサンさばく": "#E8A930",
  "ヘイホーカーニバル": "#D4621E",
  "キラーシップ": "#7B3FB5",
  "クッパキャッスル": "#C0392B",
  "ホネホネツイスター": "#8B6B3D",
  "ワリオスタジアム": "#E6C000",
  "マリオサーキット": "#E34234",
  "シュポポコースター": "#2E7D32",
  "DKうちゅうセンター": "#1565C0",
  "トロフィーシティ": "#00838F",
  "チョコマウンテン": "#6D4C41",
  "キノピオファクトリー": "#E53935",
  "どんぐりツリーハウス": "#558B2F",
  "マリオブラザーズサーキット": "#C62828",
  "モーモーカントリー": "#43A047",
  "ピーチスタジアム": "#E91E63",
  "ノコノコビーチ": "#0288D1",
  "ディノディノジャングル": "#33691E",
  "リバーサイドサファリ": "#EF6C00",
  "プクプクフォールズ": "#1A237E",
  "ショーニューロード": "#4527A0",
  "おばけシネマ": "#4A148C",
  "ソルティータウン": "#006064",
  "アイスビルディング": "#01579B",
  "ロゼッタてんもんだい": "#1A237E",
  "ワリオシップ": "#F57F17",
  "DKスノーマウンテン": "#37474F",
  "ハテナしんでん": "#FFD600",
  "ピーチビーチ": "E91E63",
};

const STORAGE_KEY = "mkw_pswitch_cleared";

function loadCleared() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveCleared(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

export default function App() {
  const [cleared, setCleared] = useState(() => loadCleared());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | cleared | uncleared

  const toggleCleared = (id) => {
    setCleared(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveCleared(next);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return P_SWITCHES.filter(sw => {
      const matchQ = query === "" || sw.title.includes(query) || sw.area.includes(query);
      if (!matchQ) return false;
      if (filter === "cleared") return cleared.has(sw.id);
      if (filter === "uncleared") return !cleared.has(sw.id);
      return true;
    });
  }, [query, filter, cleared]);

  const total = P_SWITCHES.length;
  const clearedCount = cleared.size;
  const pct = Math.round((clearedCount / total) * 100);

  // Group by area preserving order
  const grouped = useMemo(() => {
    const map = new Map();
    for (const sw of filtered) {
      if (!map.has(sw.area)) map.set(sw.area, []);
      map.get(sw.area).push(sw);
    }
    return map;
  }, [filtered]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d1b2a 0%, #1b3a5c 40%, #0a2744 100%)",
      fontFamily: "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif",
      color: "#fff",
      paddingBottom: 60,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #e63946 0%, #c1121f 50%, #9d0208 100%)",
        padding: "16px 20px 12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>🔵</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1, lineHeight: 1.1 }}>
              マリオカートワールド
            </div>
            <div style={{ fontSize: 13, opacity: 0.85, fontWeight: 700 }}>
              Pスイッチ クリアチェッカー
            </div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#FFD700" }}>{clearedCount}<span style={{ fontSize: 13, color: "#fff", opacity: 0.8 }}>/{total}</span></div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>{pct}% 達成</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 999, height: 8, marginBottom: 10, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #FFD700, #FFA500)",
            borderRadius: 999,
            width: `${pct}%`,
            transition: "width 0.4s ease",
            boxShadow: "0 0 10px rgba(255,215,0,0.7)",
          }} />
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 8 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.7 }}>🔍</span>
          <input
            type="text"
            placeholder="タイトル・エリア名で検索…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 12px 10px 38px",
              borderRadius: 12,
              border: "none",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: 14,
              outline: "none",
              backdropFilter: "blur(10px)",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", opacity: 0.7,
            }}>×</button>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6 }}>
          {[["all","すべて"],["uncleared","未クリア"],["cleared","クリア済"]].map(([v, label]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              flex: 1, padding: "6px 0", borderRadius: 20, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: 12,
              background: filter === v ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
              color: filter === v ? "#FFD700" : "rgba(255,255,255,0.7)",
              transition: "all 0.2s",
            }}>{label} {v === "uncleared" ? `(${total - clearedCount})` : v === "cleared" ? `(${clearedCount})` : `(${total})`}</button>
          ))}
        </div>
      </div>

      {/* Results count when searching */}
      {(query || filter !== "all") && (
        <div style={{ padding: "8px 16px", fontSize: 12, opacity: 0.7, textAlign: "center" }}>
          {filtered.length} 件表示中
        </div>
      )}

      {/* Groups */}
      <div style={{ padding: "8px 12px 0" }}>
        {grouped.size === 0 && (
          <div style={{ textAlign: "center", padding: 60, opacity: 0.5 }}>
            <div style={{ fontSize: 40 }}>🔍</div>
            <div style={{ marginTop: 10 }}>該当なし</div>
          </div>
        )}
        {[...grouped.entries()].map(([area, switches]) => {
          const areaColor = AREA_COLORS[area] || "#444";
          const areaCleared = switches.filter(s => cleared.has(s.id)).length;
          return (
            <div key={area} style={{ marginBottom: 12 }}>
              {/* Area header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 12px", borderRadius: "10px 10px 0 0",
                background: areaColor,
                boxShadow: `0 2px 8px ${areaColor}88`,
              }}>
                <span style={{ fontWeight: 900, fontSize: 13, flex: 1 }}>{area}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: "rgba(0,0,0,0.25)", padding: "2px 8px", borderRadius: 999,
                }}>{areaCleared}/{switches.length}</span>
              </div>

              {/* Switch items */}
              <div style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "0 0 10px 10px",
                overflow: "hidden",
                border: `1px solid ${areaColor}44`,
                borderTop: "none",
              }}>
                {switches.map((sw, i) => {
                  const done = cleared.has(sw.id);
                  return (
                    <div
                      key={sw.id}
                      onClick={() => toggleCleared(sw.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 12px",
                        borderBottom: i < switches.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                        background: done ? "rgba(255,215,0,0.08)" : "transparent",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        userSelect: "none",
                      }}
                    >
                      {/* Checkbox */}
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        border: `2px solid ${done ? "#FFD700" : "rgba(255,255,255,0.3)"}`,
                        background: done ? "#FFD700" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                        boxShadow: done ? "0 0 8px rgba(255,215,0,0.5)" : "none",
                      }}>
                        {done && <span style={{ fontSize: 13, color: "#000", fontWeight: 900 }}>✓</span>}
                      </div>

                      {/* Title */}
                      <span style={{
                        fontSize: 13,
                        flex: 1,
                        color: done ? "rgba(255,255,255,0.5)" : "#fff",
                        textDecoration: done ? "line-through" : "none",
                        lineHeight: 1.4,
                      }}>
                        {sw.hard && <span style={{ fontSize: 10, background: "#ff4757", color: "#fff", padding: "1px 5px", borderRadius: 4, marginRight: 5, fontWeight: 700, verticalAlign: "middle" }}>超難</span>}
                        <span style={{ fontSize: 10, opacity: 0.5, marginRight: 4 }}>#{sw.id}</span>
                        {sw.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
