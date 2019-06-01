# NotiGiraMundo -- Global Concert News

NotiGiraMundo collects and bring you the concert/tour information of globally-popular artists.

NotiGiraMundoは世界で人気のあるアーティスト達のコンサート＆ツアー情報をお知らせします。

"Gira" means "Tour" in Spanish.

For music/concert geeks around the world :)



## Description

### Concert search app that centerizes Artist, not Location.
#### アーティスト・ファーストなコンサート・サーチ
This app collects any concerts of your favorite artist.

ユーザーのお気に入りアーティストが開催する世界各地のコンサートを集めます。

### No City select
#### 都市選択が不要
When you search concerts on ticket providers' website, you are required to set your current city or search area. That's reasonable as normally concerts are planned to see local fans.

チケットサイトでコンサートを検索する際は、必ずと言っていいほど現在地や検索都市を指定することが要求されます。これは、コンサートが地元のファンとアーティストの交流の場であることを考えれば当然なことです。

HOWEVER, it makes it unconvenient for geeks who are planning to travel for concerts to search -- They aren't sure IN WHICH CITY they'll join concerts. Each concert of a global tour can have different ticket providers. Geeks have to crawl many websites to check dates, venues, transportations, accommodations.... etc.

しかし、コンサートのために遠征を考えているオタクにとってはこの機能がとても不都合です。オタクはどのコンサートにでも行けるのです。遠征オタクはいくつものサイトを確認してそれぞれのコンサートの日時、会場、アクセス、宿泊場所など…を比較しなければならないのです。一つのツアーであっても国によりチケットサイトが異なることもあり、検索にはとても時間がかかります。

With NotiGiraMundo, you can find your favorite artists' concerts without selecting location.

NotiGiraMundoでは、アーティストのコンサート情報を都市選択なしで一括検索することができます。

### Enrich information with users
#### ユーザーと作り上げられるコンサート情報
Users who have account can "refresh artist' concert info". It's not open for guest users.
With this "refresh artist's concert info", users can update that artists' information.

ログインしたユーザーは"refresh artist' concert info"のボタンを押すことができます。ゲストユーザーには制限がかかっている機能です。
このボタンでユーザーはお気に入りアーティストのコンサート情報が更新されていないか確認することができ、さらに確認された情報は他のユーザーにも共有されます。

### Keep and compare. Plan your travel
#### 気になるコンサートはキープして、比較、プランしてフライトへ。
Users can keep concerts that you were interested in. On my page, those kept concerts are listed, and mapped on the world map.
Compare the conditions - Venues, dates, etc. - and plan your travel. With a click you can jump to the ticket provider's buy-ticket page.

ログインしたユーザーは気になるコンサートをキープすることができます。マイページに移動すると、これまでにお気に入りしたコンサートが一覧の表で表示され、また世界地図の上にもロケーションが表示されます。会場、日付などの条件を比較して、旅行を計画しましょう。また、１クリックでチケットプロバイダーによるチケット購入サイトに飛ぶこともできます。

## Function

### Artists Page
- Please search your favorite artists' name. If the singer was already registered on the app, his/her icon would be appeared. If not, the search results of MusicBrainz would be shown. What you only have to do is click his/her correct name. If there was any description of the artist available, with your mouseover it would be on the page.
好きなアーティストの名前を検索してみてください。すでにそのアーティストがアプリに登録されている場合は、アイコンが表示されます。まだ登録されていない場合はMusicBrainzのデータベースからのサーチ結果がテキストで表示されます。複数の検索結果から、適当なアーティスト名をクリックしてください。アーティストの詳細情報が入手できていた場合はアーティスト名へのマウスオーバーで詳細情報が表示されます。


- On artist page, let's check his/her information. Please click "TicketMaster" or "Songkick" logo on the left column. The artist's concerts would be searched on those ticket providors' database and would be saved on this app. If you don't find any update from those platforms but knowing any information, please input manually those information(Only permitted for admin users)
アーティスト詳細ページでコンサート情報を探しましょう。世界中のチケット情報を入手できる"TicketMaster"と"Songkick"、２つのチケットサイトが用意されています。左のカラムにあるロゴをクリックしてください。そのアーティストのコンサート情報をアプリが検索し、結果を表示します。もし、どちらのチケットサイトからも発見されなかったコンサートの情報をあなたがご存知の場合は、手作業でコンサート情報を入力することもできます（管理者アカウントのみ対応可能）。



### Concerts Page
- Concerts page is the top page. Concerts that have enought information to show on the top page are listed. Admin users will confirm other concerts that lack any data and those would be added soon. You can use Asc/Desc sort by date. With the "Plan" button, you'll check date-confricts of concerts.
コンサート一覧ページはトップページです。リストするのに十分な情報の揃っているコンサートのみがトップページに表示されています。アプリ管理者が順次、不足情報のみられるコンサート情報のデータを確認し、完了次第トップページに追加されます。トップページではコンサートの日付を今日から近い順/遠い順に並び替えることが可能です。また、"Plan"ボタンを利用すると、気になるコンサートと日程の重複がある他のコンサートをハイライトで確認することができます。

- On each concert page, you see those basic data of the concert, like date and venue. If the local time wasn't provided, please try to click "Check local time" button. 
各コンサート情報のページでは、日付や会場などの基本情報を確認することができます。もしトップにローカルタイムが表示されていない場合は"Check local time"ボタンを押してください。ローカルタイムを確認し、表示します。

## Requirement


## Framework
- Ruby 2.5.5
- Rails 5.2.3
