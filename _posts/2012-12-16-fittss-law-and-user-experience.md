---
layout: post
title: 哪些场合不宜用菲茨定律去衡量用户体验标准  
date: 2012-12-16 15:16
comments: true
categories: []
---
<p>菲兹定律的核心观点是，移动一个点到目标所需的时间随之与目标的之间的距离和尺寸的变化而变化。外行看来，距离越近，目标越大，点击目标也就越快。这个很容易理解，实践起来也不难，去驳斥这个简单而又明显的观点似乎也没有多大意义。<!--more--></p>

但是，在你将菲兹定律应用到设计过程中每个像素之前，请站在一个交互设计师的角度去思考一些可能会遇到的问题。
<h3><strong>菲兹定律第一条：放大目标</strong></h3>
菲兹定律所表达出的最明显的观点可能就是“目标越大，接近目标就越快”。

优势：

建立较大的目标有利于交互，同时也能够让你充分利用界面的每一个像素。

例如，某些网站没有将按钮或者链接的可点击区域应用到整个目标上，结果导致用户需要更加精确的移动鼠标才能达到对应链接，从而延长了导航所需的时间。菲兹定律建议充分使用好每个可供利用的像素，从而扩大可点击区域， 使目标变得更大。

[caption id="attachment_1950" align="aligncenter" width="500"]<img class="size-full wp-image-1950" alt="Fitts_Buttons" src="http://www.coursegarden.com/wp-content/uploads/2012/12/01-Fitts_Buttons.png" width="500" height="86" /> 左边的目标浪费了屏幕上宝贵的像素。右边的目标通过充分利用每个像素使自身变得更大，也能够更快的被点击。(左边例子:Firefox,右边例子:Apple)[/caption]

通过增加按钮的绝对或者相对尺寸来使得目标更容易点击这一技巧，正在被那些把<strong>交流</strong>放在首要位置的设计师充分利用，意在达到鼓励用户实施某个特定操作的目的。

[caption id="attachment_1951" align="aligncenter" width="500"]<img class="size-full wp-image-1951" alt="LibreOffice" src="http://www.coursegarden.com/wp-content/uploads/2012/12/02-LibreOffice.jpg" width="500" height="174" /> 相对和绝对尺寸在以交流为先的界面中的应用。(示例:LibreOffice)[/caption]

尽管在设计一个鼓励用户行为的按钮还有很多需要考虑的因素，菲兹定律提供了一个需要最先考虑的理论基础。

劣势：

当然，大目标不好的地方在于它可以打破界面平衡，并且会很容易占据有限屏幕的很多区域。然而即使在你有足够可供利用区域的时候，你也没有必要通过一直增大目标区域来使得目标更容易被点击。原因在于<a href="http://sixrevisions.com/usabilityaccessibility/improving-usability-with-fitts-law/">按钮的预计可用性随尺寸大小的增大呈非线性增长</a>。

[caption id="attachment_1952" align="aligncenter" width="500"]<img class="size-full wp-image-1952" alt="Non-linear-progression" src="http://www.coursegarden.com/wp-content/uploads/2012/12/03-Non-linear-progression-low-res.jpg" width="500" height="298" /> 因此，当你将一个按钮增大10%, 它会更容易被点击，但是如果你将一个已经很大的按钮增大10%, 就可用性而言不会获得太大提升。[/caption]
<h3><strong>菲兹定律第二条：减少鼠标移动</strong></h3>
另外一个可以从菲兹定律得出的观点是：“目标越近越容易被点击”。

优势：

如果你将用户日常操作最容易点击的链接和按钮放在一起，而不是将分布在界面的各个地方，这样你就可以通过减少鼠标移动的距离来使交互变得更快。

考虑下这个例子，<a href="http://unity.ubuntu.com/">Ubuntu Unity</a>社区的界面。它允许你通过使用文字和文件类型两种不同的筛选器来查找各种资源。你可以从下面的图片中看到这两个过滤器之间相隔的距离有多远。文字筛选器被放在了屏幕的最上方，而文件类型筛选器却被放在了最下方。

<img class="aligncenter size-full wp-image-1953" alt="Unity" src="http://www.coursegarden.com/wp-content/uploads/2012/12/04-Unity.jpg" width="500" height="306" />

为了实现更加流畅的工作流，这样的布局不是最优的。在执行搜索查询时，用户通常是通过连续使用文本框区域和文件类型筛选器来获取搜索结果。在这里为了实现查找目的，鼠标需要移动很远的距离。事实上，将文件类型图标放在文本框区域的旁边，可以减少鼠标的移动来提升交互速度（同时也可以节省竖直方向的空间）。

劣势：

严格的按照这个方式来布局将会与很多其他重要的设计理念相冲突，例如<strong>根据功能和内容来划分和分组不同的类</strong>。它的目的在于呈现一个更加干净整洁的界面，同时也能使目标更加容易被发现。

注意下面的图片中各个工具是如何按照小的具有意义的分组来排列：在这里表哥工具被放在左边，插入工具被放在右边。

<img class="aligncenter size-full wp-image-1954" alt="Numbers-Toolbar" src="http://www.coursegarden.com/wp-content/uploads/2012/12/05-Numbers-Toolbar-1.png" width="500" height="70" />

这样用户可以在脑海中构建一张如何获取某个信息或者工具的图片。相反，如果你仅仅根据它们所使用的频率来进行分析，你可能会选择一种最少化鼠标移动的方案。结果只会打破界面的功能结构。

另外一个与菲兹定律发生冲突的理念是“提供一个干净整洁的界面”。为了简化界面，一些网站使用下拉列表来对内容进行分组。尽管有很多设计师对其可用性<a href="http://www.useit.com/alertbox/20001112.html">提出异议</a>(这个超出了本文讨论的范围),下拉列表仍被视为一种视觉优雅而又节省空间，简化界面，更好组织界面的方法。

[caption id="attachment_1955" align="aligncenter" width="500"]<img class="size-full wp-image-1955" alt="blurb-1" src="http://www.coursegarden.com/wp-content/uploads/2012/12/06-blurb-1.jpg" width="500" height="258" /> 下拉列表可以帮助你更好的组织内容和清理界面。(范例:Blurb.com)[/caption]

菲兹定律不推荐使用下拉列表是因为它会增加很多的鼠标移动，导致用户无法通过在一条直线上移动光标来接近目标。用户首先需要点击或者将鼠标悬浮在下拉列表上，然后移动鼠标到列表项上（还有可能需要另一个子菜单）直到鼠标最终到达目标。但是考虑到它所带来的好处，下拉列表所导致的长距离鼠标移动这一缺陷可以得到弥补。

第三个可能让你对菲兹定律表示不服的观点就是“<strong>建立一个容错的界面</strong>”, 目的在于能够防范或者减小错误造成的损失。

菲兹定律建议将元素依次排列从而减少鼠标移动，同时节省页面空间。然而，节省了那一点点空间却可能导致用户点击错误的元素，特别是在那些元素边界不易区分或者焦点元素没有被显著区分的情况下。

[caption id="attachment_1956" align="aligncenter" width="389"]<img class="size-full wp-image-1956" alt="Input_Mistake" src="http://www.coursegarden.com/wp-content/uploads/2012/12/07-Input_Mistake.jpg" width="389" height="92" /> 错误随时有可能发生：界面元素的位置可以导致或者组织错误发生。(范例:Codebeamer.com)[/caption]

但是请注意，<strong>由具有导航功能的元素产生错误的影响没有由分享或者编辑功能产生的影响严重</strong>。

如果我点击了错误的链接，我可以简单的点击“返回”按钮来挽回错误。因此，当链接出现在头部或者侧边栏时，在它们之间留出空白区域不会造成真正的伤害。

当我们在使用导航时，事情会变得更加让人讨厌。尤其在播放视频，音频文件或者显示文档时，意外点击“暂停”，“关闭”，“下一个”，“清除播放列表”按钮，用户需要更多的努力才能恢复到错误操作时的状态。

然而，在涉及到编辑和分享功能时，错误可能是具有毁灭性的。例如点击屏幕上的“发送”，“打印”，“删除”，“下载”，“上传”，“刻录”，“剪切”，“关闭”，“关机”，“连接”，“断开连接”，“接受”或者“拒绝”按钮时，动作可能造成更加严重的后果，并且无法被轻易撤销

因此，在处理带有编辑或者分享功能的元素时，<strong>你应该采取更多的措施</strong>来减少错误发生的几率并降低错误导致后果的严重性:
<ul>
	<li>提供更简单的撤销方式（一个选项：<a href="http://www.thepicky.com/internet/recall-email-that-is-send-undo-send-in-gmail/">撤销按钮</a>）</li>
	<li>按钮之间尝试留出空隙</li>
	<li>元素边缘区分清晰</li>
	<li>高亮焦点元素</li>
	<li>将按钮分组摆放，<a href="http://www.codinghorror.com/blog/2010/03/the-oppos&lt;/li&gt; &lt;p&gt;ite-of-fitts-law.html">最小化错误发生时的影响</a></li>
</ul>
举个例子来说明上面列表中的最后一项：如果我意外的将“获取邮件”按钮看成并点击了“编写邮件”按钮，结果可能不会太严重，但是不要将“回复”和“删除”放在一起。

将操作分成<strong>两个步骤</strong>是一种可以阻止错误发生的特殊处理方式。两步操作方式应用并不广泛。原因在于两个步骤会使双手或者鼠标点击时需要移动更远的距离，但它们却可以使操作变得更加的安全。简单说来，就是当你可以在无意中分开进行两次操作的时候，你几乎不可能无意识的同时进行两次连续操作。例如滑动-删除这个例子。

[caption id="attachment_1957" align="aligncenter" width="500"]<img class="size-full wp-image-1957" alt="swipe-to-delete" src="http://www.coursegarden.com/wp-content/uploads/2012/12/08-swipe-to-delete.jpg" width="500" height="176" /> 首先滑动，然后删除。虽然二者单独存在时很容易被触发，但是放在一起就形成了一种防止错误操作机制。（范例：Timelogger App）[/caption]

我能想象我可能会意外的将手指从左边滑到右边，或者点击了某个按钮，但是却很难连续的执行以上两个操作。

两步操作方法主要被应用在移动设备上，原因在于用户在更容易在这些设备上产生错误操作。此外，它还可以节省更多的空间。因为在第一个步骤发生之前，第二个步骤的按钮没有必要出现在可视区域内。

因此，不管是滑动/触摸，滑动/滑动，还是触摸/触摸，两步操作方式从一定程度上比直接呈现一个很大的按钮操作起来更加困难，但是这些“不便之处”在某些需要安全操作的场景下可能会更加实用。
<h3><strong>菲兹定律第三条：Avoid Muscular Tension</strong></h3>
<a href="http://www.smpp.northwestern.edu/savedLiterature/FittsLawPapers/FittsLaw%20as%20Research.Design.Tool.in.HCI.MacKenzie.pdf">菲兹定律性能索引</a>的目的就是量化人机交互系统的信息容量。换句话讲，它旨在根据执行特定命令所需物理动作数量，对输入方法进行评估。

优势

在使用体积庞大的设备工作时，简单的输入法的优势会愈加明显。最显而易见的例子就是墙面触摸屏，这些设备通常被部署在专业性比较强的环境，用于建立，展示并管理大量的数据。

[caption id="attachment_1958" align="aligncenter" width="500"]<img class="size-full wp-image-1958" alt="Vertical_Touchscreen" src="http://www.coursegarden.com/wp-content/uploads/2012/12/09-Vertical_Touchscreen.jpg" width="500" height="511" /> 菲兹定律在墙面触控屏上的应用。（范例：Perceptive Pixel）[/caption]

使用竖直摆放的屏幕时，一直保持手臂处于笔直的状态会迅速导致三角肌疲劳，并导致输入错误或者迫使用户放弃操作。因而，避免使用复杂费力的操作方法有助于以上设备的交互优化。

劣势

某些难以执行的操作方法通常可以防止错误的发生。例如，移动设备通常被随身携带在口袋里，这样一来也导致容易意外触发某些命令。在那样的场合下，<strong>高精度操作方法（</strong><strong>high-precision input</strong><strong>）</strong>使用了更加复杂的操作来进行部署，从而确保一个命令不会被意外执行。因此，这些操作同样是方便用户了解某项命令严重性的一种方法。例如，iPhone的关机操作：

[caption id="attachment_1959" align="aligncenter" width="240"]<img class="size-full wp-image-1959" alt="iphone-off" src="http://www.coursegarden.com/wp-content/uploads/2012/12/10-iphone-off-1.jpg" width="240" height="344" /> 根据后果的严重性来选择UI元素：滑动控制用于危险命令，按钮用于普通命令。（范例：iPhone截图: Outsideinnovation.com）[/caption]

关机或者重启设备通常是比较重要的命令；一旦被触发就无法撤销。因此，它们通常采用操作精细度比较高的滑动效果。相反，撤销操作不会造成太大影响，因此被做成了一个按钮。

需要更加精细操作的滑动控制和手势操作是最安全但同时也是最乏味的操作方法。因而，出于平衡安全性和可用性双重考虑，他们通常默认用来执行频率较高的危险操作，例如解锁，关机，设定系统偏好，执行管理员任务或者关闭闹钟声音。而当涉及到一些应该快速且经常被执行的危险命令时，例如编辑，删除或者移动元素时，经过良好排版的两部操作方法通常会更加合适。尽管它不能提供同样程度的安全性，至少可以在相对安全的程度下保持了易操作性。

另外一个需要使用复杂操作的理由是<strong>手势操作可以节省屏幕空间这一天然优势</strong>。根据菲兹定律性能优化索引，手势（包括一定程度上的拖拽）会产生更多的<a href="http://www.billbuxton.com/fitts91.html">肌肉紧张</a>（muscular tension），这也是为什么菲兹定律会优先考虑光标点击操作。手势的优势在于它不需要UI控制就可以被触发。

例如你在<a href="http://deviantart.com/">deviantART</a>上管理你的作品。为了添加某个元素到你的喜爱列表里，你不需要点击某个按钮。在你开始拖动一张照片时，一个可供放置元素的面板将会出现。

[caption id="attachment_1960" align="aligncenter" width="500"]<img class="size-full wp-image-1960" alt="Deviantart-1" src="http://www.coursegarden.com/wp-content/uploads/2012/12/11-Deviantart-1.jpg" width="500" height="254" /> 拖拽提供了无需可视元素即可出发操作的功能。（范例：deviantART）[/caption]

因为不需要按钮或者一些其他的UI元素来触发某个功能，拖拽可以节省很多空间。不好的地方当然也很明显，它没有提供一个可视化的提示来表明他的存在（除非通过tooltips浮动层进行提示）。当受到屏幕尺寸的限制时，这些方法虽然操作起来很复杂，但实际也是必须的。
<h3><strong>菲兹定律第四条：利用主要像素（Exploit The Prime Pixels</strong><strong>）</strong></h3>
主像素的理念就是某些像素需要比其他的像素更快被获取。角落和边缘是特别容易到达的地方。然而，在任何情况下，最快能够被获取的像素却是当前鼠标所在的位置。这个也被现代人机交互设计应用在了右键点击上下文菜单中。

优势

右键点击选中元素，鼠标点击处会出现上下文菜单，菜单提供了区分上下文的选项。这样做的好处是，你不需要移动鼠标很远才能到达界面上某个固定位置。上下文菜单分两种：<strong>线性菜单和径向，或饼形菜单。</strong>

参考菲兹定律，很明显其更倾向于径向菜单。原因之一，楔形菜单的入口提供了更大的目标区域。原因之二，因为菜单是圆形的，光标移动到每个菜单入口的距离总是相同的。这个统一性允许用户建立一个高效的肌肉记忆。相反，在线性菜单中，只有最靠近初始光标位置的菜单入口才能被迅速点击。这也是为什么那些被经常操作的动作需要预留在固定的位置。

[caption id="attachment_1961" align="aligncenter" width="500"]<img class="size-full wp-image-1961" alt="Menus" src="http://www.coursegarden.com/wp-content/uploads/2012/12/12-Menus1-e1350578121106.jpg" width="500" height="250" /> 菲兹定律更倾向于径向菜单。（左侧示例：OneNote 2013, 右侧示例： Firefox）[/caption]

&nbsp;

将元素放在屏幕边缘和角落是因为屏幕框架在它到达位置之后会引导并定位光标。

（The benefits of placing items at the corners and edges of the screen are that the screen frame guides and positions the cursor once it reaches that location.）

[caption id="attachment_1962" align="aligncenter" width="500"]<img class="size-full wp-image-1962" alt="Fitts_Corners_and_Edges" src="http://www.coursegarden.com/wp-content/uploads/2012/12/13-Fitts_Corners_and_Edges-1a.jpg" width="500" height="170" /> 角落和边缘是主屏的固定区域。(示意图：Particletree)[/caption]

劣势

实证研究<a href="http://www.donhopkins.com/drupal/node/100">证实了关于径向上下文菜单与线性上下文菜单的假设</a>，前者在查找时间和出错率上相比后者有一点点的优势。然而，当调查参与者被问到他们的主观偏好时，饼状菜单再也不那么受欢迎了。

虽然饼状菜单能够更好的适应菲兹定律，但是在某些场景下，其带来的劣势却远远超过它的优势。

其中一个问题在于<strong>当越来越多的菜单入口被添加时，圆形菜单的形状易使目标区域变小</strong>。但我们可以通过移除多余的选项来解决这个问题，这样正好符合了<a href="http://uxdesign.smashingmagazine.com/2012/02/23/redefining-hicks-law/">Hick定律</a>的理论。例如，如果一个菜单的入口不是仅应用到当前所选元素，或者可以从界面的其它地方被访问到，它们没有同样没有必要和上下文菜单放在一起（“剪切”，“复制”和“粘贴”通常仅仅适用于哪些被选中的区域，而“撤销”，“重做”，“新建文件”，“保存文件”，“打印文件”或者“放大/缩小”等却更适合放在固定的工具栏之中）。

另外一个管理很多选项的方式就是次级菜单。虽然这个可能包含在径向菜单之内，这么做会很快使整个屏幕变得混乱，并且看起来没有传统的线性菜单那样直观和整洁。这与线性菜单的一个特殊优势有关：它使通过次级菜单和入口分组实现层级关系变得更加简单。

[caption id="attachment_1963" align="aligncenter" width="654"]<img class="size-full wp-image-1963" alt="Linear_Menu" src="http://www.coursegarden.com/wp-content/uploads/2012/12/14-Linear_Menu.png" width="654" height="108" /> 入口分组更容易在线形菜单上实现。(示例：Word 2013. 截图：PCPro.co.uk)[/caption]

最后一点，圆形菜单会占据更多的空间。这会导致两个问题：其一，它会使得所选对象变得模糊，并且在事件触发地点靠近屏幕边缘时出现在其他地方而不是光标当前所在位置。

因而，总结下来，在以下情况下你可以考虑线形上下文菜单：
<ul>
	<li>你需要混合很多选项，</li>
	<li>你需要使用次级菜单，</li>
	<li>你需要对菜单入口进行分组和排序，</li>
	<li>屏幕尺寸至关重要。</li>
</ul>
最后，对于屏幕的角落和边缘，针对鼠标操作设备时存在两个潜在的问题。在大尺寸屏幕上，光标移动所经过的像素数量可能会覆盖掉前面提到过的优势。同样，网页设计师不会从这个准则中得到任何好处。原因在于他们所有的内容（除了全屏模式下）都是在浏览器窗口下运行。这样他们根本无法利用屏幕边缘区域，而往往最需要选择的是一个更加紧密且集中的布局。

在处理到触摸屏幕等非鼠标操作的设备时，将界面元素放在屏幕的角落和边缘无法产生积极影响从而加速交互。甚至会造成不利的影响。在大尺寸屏幕上，用户需要经常的展开和收起手臂，从而容易很快感到疲劳。因此在大尺寸屏幕上，被频繁使用的工具应该做成可随意移动的对象。这样用户只需将这些工具放在自己喜欢或者靠近双手的位置，工作起来也会更加容易。这个也正好与菲兹定律的原则相符。
<h3><strong>结语</strong></h3>
交互设计师和用户体验设计师所面临的难题是，他们必须同时考虑，权衡并结合用户体验的众多可控和非可控因素，才能最终建立最好的产品。菲兹定律试着提供更加容易量化和计算的准确值，去帮助用户界面设计师去做设计上的决择。

当然，我们可以通过一些数值去衡量一个界面的优劣，例如：读取某段数据鼠标点击的次数，导航所需要的时间；水平对齐界面所拥有更多竖直方向可利用像素数量，针对相应设备的显示方向的适应程度；最常被使用按钮的摆放位置，以及更少距离的光标移动。

界面应<strong>始终以人为本</strong>，并保持平台一致性，更多的替用户着想，具备更加独特气质，更加容易把玩并且容易被发现。实际上我们很难简单的通过点击或者像素来衡量界面质量。菲兹定律中，高度精确且简化的数学方程，使得设计师们更加倾向于使用那些可控的方法。但需要注意的是，数学方程虽然可以帮助你提升用户体验，你只能把它当作工具而非准则来使用。

相反，你应该经过更多的讨论，优先站在人类学的角度，并且在条件允许的情况下，更多的使用菲兹定律去提升实际的用户体验。

&nbsp;
<h3><strong>扩展阅读</strong></h3>
你可能会感兴趣的资源：
<ol>
	<li><a href="http://www.cs.umd.edu/class/fall2002/cmsc838s/tichi/fitts.html">Fitts’ Law: Modeling Movement Time in HCI</a>  菲兹定律大纲</li>
	<li><a href="http://www.smpp.northwestern.edu/savedLiterature/FittsLawPapers/Information%20Capacity%20of%20Human%20Motor%20System%20Controlling%20Ampltude%20of%20Movement.Paul.Fitts.pdf">The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement</a> (PDF) Paul Fitts’s 于1954年发表在实验心理学期刊上发表的原文（Journal of Experimental Psychology）</li>
	<li><a href="http://d3rxqy8m5km8r7.cloudfront.net/features/visualizing-fittss-law/">Visualizing Fitts’ Law</a> 应用一系列的可视化图标来展示菲兹定律</li>
	<li><a href="http://www.smpp.northwestern.edu/savedLiterature/FittsLawPapers/FittsLaw%20as%20Research.Design.Tool.in.HCI.MacKenzie.pdf">Fitts’s Law as a Research and Design Tool in Human-Computer Interaction</a> (PDF) 关于更高效输入方法的探讨</li>
	<li><a href="http://www.donhopkins.com/drupal/node/100">An Empirical Comparison of Pie vs. Linear Menus</a> 针对饼形菜单与线形菜单之间在查询时间和错误率的可控实验测试</li>
	<li><a href="http://www.asktog.com/columns/022DesignedToGiveFitts.html">A Quiz Designed to Give You Fitts</a> 一个测试你对菲兹定律了解程度的小测验</li>
</ol>
&nbsp;

译文出处：<a href="http://www.coursegarden.con/">CourseGarden</a>

原文出处：<a href="http://uxdesign.smashingmagazine.com/2012/12/04/fittss-law-and-user-experience/">Smashing Magazine – When You Shouldn’t Use Fitts’s Law To Measure User Experience</a> By<a href="http://uxdesign.smashingmagazine.com/author/anastasios-karafillis/?rel=author"> Anastasios Karafillis</a>

个人能力及精力有限，出错在所难免，欢迎指正。辛勤劳动，转载还请注明出处！

&nbsp;

&nbsp;
