(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("RichTextEditor");
            this.set_titletext("RichTextEditor");
            this.getSetter("inheritanceid").set("");
            this.getSetter("position").set("absolute");
            if (Form == this.constructor)
            {
                this._setFormPosition(710,532);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_fontsize", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"text\" type=\"STRING\" size=\"256\"/><Column id=\"pt\" type=\"STRING\" size=\"256\"/><Column id=\"font\" type=\"STRING\" size=\"256\"/><Column id=\"fontclass\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"text\">가나다라(8pt)</Col><Col id=\"code\">1</Col><Col id=\"pt\">8</Col><Col id=\"font\">antialias 8 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont8</Col></Row><Row><Col id=\"text\">가나다라(10pt)</Col><Col id=\"code\">2</Col><Col id=\"pt\">10</Col><Col id=\"font\">antialias 10 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont10</Col></Row><Row><Col id=\"text\">가나다라(12pt)</Col><Col id=\"code\">3</Col><Col id=\"pt\">12</Col><Col id=\"font\">antialias 12 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont12</Col></Row><Row><Col id=\"text\">가나다라(14pt)</Col><Col id=\"code\">4</Col><Col id=\"pt\">14</Col><Col id=\"font\">antialias 14 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont14</Col></Row><Row><Col id=\"text\">가나다라(18pt)</Col><Col id=\"code\">5</Col><Col id=\"pt\">18</Col><Col id=\"font\">antialias 18 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont18</Col></Row><Row><Col id=\"text\">가나다라(24pt)</Col><Col id=\"code\">6</Col><Col id=\"pt\">24</Col><Col id=\"font\">antialias 24 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont24</Col></Row><Row><Col id=\"text\">가나다라(36pt)</Col><Col id=\"code\">7</Col><Col id=\"pt\">36</Col><Col id=\"font\">antialias 36 돋움</Col><Col id=\"fontclass\">Editor_grd_popCellFont36</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_tableBoderHeight", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/><Column id=\"icon\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">1</Col><Col id=\"value\">1pt</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_1pt.png&apos;)</Col></Row><Row><Col id=\"code\">2</Col><Col id=\"value\">2pt</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_2pt.png&apos;)</Col></Row><Row><Col id=\"code\">3</Col><Col id=\"value\">3pt</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_3pt.png&apos;)</Col></Row><Row><Col id=\"code\">4</Col><Col id=\"value\">4pt</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_4pt.png&apos;)</Col></Row><Row><Col id=\"code\">5</Col><Col id=\"value\">5pt</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_5pt.png&apos;)</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_tableLayout", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Column0\" type=\"STRING\" size=\"256\"/><Column id=\"Column1\" type=\"STRING\" size=\"256\"/><Column id=\"Column2\" type=\"STRING\" size=\"256\"/><Column id=\"Column3\" type=\"STRING\" size=\"256\"/><Column id=\"Column4\" type=\"STRING\" size=\"256\"/><Column id=\"Column5\" type=\"STRING\" size=\"256\"/><Column id=\"Column6\" type=\"STRING\" size=\"256\"/><Column id=\"Column7\" type=\"STRING\" size=\"256\"/><Column id=\"Column8\" type=\"STRING\" size=\"256\"/><Column id=\"Column9\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/><Row/><Row/><Row/><Row/><Row/><Row/><Row/><Row/><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_blockquote", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"html\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"html\">&lt;blockquote class=&quot;quote1&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote2&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote3&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote4&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote5&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote6&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote7&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote8&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote9&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote10&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote11&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote12&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote13&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote14&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row><Row><Col id=\"html\">&lt;blockquote class=&quot;quote15&quot;&gt;&lt;p&gt;blockquote 인용구&lt;/p&gt;&lt;/blockquote&gt;</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_char", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"Col00\" type=\"STRING\" size=\"256\"/><Column id=\"Col01\" type=\"STRING\" size=\"256\"/><Column id=\"Col02\" type=\"STRING\" size=\"256\"/><Column id=\"Col03\" type=\"STRING\" size=\"256\"/><Column id=\"Col04\" type=\"STRING\" size=\"256\"/><Column id=\"Col05\" type=\"STRING\" size=\"256\"/><Column id=\"Col06\" type=\"STRING\" size=\"256\"/><Column id=\"Col07\" type=\"STRING\" size=\"256\"/><Column id=\"Col08\" type=\"STRING\" size=\"256\"/><Column id=\"Col09\" type=\"STRING\" size=\"256\"/><Column id=\"Col10\" type=\"STRING\" size=\"256\"/><Column id=\"Col11\" type=\"STRING\" size=\"256\"/><Column id=\"Col12\" type=\"STRING\" size=\"256\"/><Column id=\"Col13\" type=\"STRING\" size=\"256\"/><Column id=\"Col14\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"Col00\">ⓐ</Col><Col id=\"Col01\">ⓑ</Col><Col id=\"Col02\">ⓒ</Col><Col id=\"Col03\">ⓓ</Col><Col id=\"Col04\">ⓔ</Col><Col id=\"Col05\">ⓕ</Col><Col id=\"Col06\">ⓖ</Col><Col id=\"Col07\">ⓗ</Col><Col id=\"Col08\">ⓘ</Col><Col id=\"Col09\">ⓙ</Col><Col id=\"Col10\">ⓚ</Col><Col id=\"Col11\">ⓛ</Col><Col id=\"Col12\">ⓜ</Col><Col id=\"Col13\">ⓝ</Col><Col id=\"Col14\">ⓞ</Col></Row><Row><Col id=\"Col00\">ⓟ</Col><Col id=\"Col01\">ⓠ</Col><Col id=\"Col02\">ⓡ</Col><Col id=\"Col03\">ⓢ</Col><Col id=\"Col04\">ⓣ</Col><Col id=\"Col05\">ⓤ</Col><Col id=\"Col06\">ⓥ</Col><Col id=\"Col07\">ⓦ</Col><Col id=\"Col08\">ⓧ</Col><Col id=\"Col09\">ⓨ</Col><Col id=\"Col10\">ⓩ</Col><Col id=\"Col11\">①</Col><Col id=\"Col12\">②</Col><Col id=\"Col13\">③</Col><Col id=\"Col14\">④</Col></Row><Row><Col id=\"Col00\">⑤</Col><Col id=\"Col01\">⑥</Col><Col id=\"Col02\">⑦</Col><Col id=\"Col03\">⑧</Col><Col id=\"Col04\">⑨</Col><Col id=\"Col05\">⑩</Col><Col id=\"Col06\">⑪</Col><Col id=\"Col07\">⑫</Col><Col id=\"Col08\">⑬</Col><Col id=\"Col09\">⑭</Col><Col id=\"Col10\">⑮</Col><Col id=\"Col11\">ㅿ</Col><Col id=\"Col12\">ㆀ</Col><Col id=\"Col13\">ㆁ</Col><Col id=\"Col14\">ㆅ</Col></Row><Row><Col id=\"Col00\">ㅹ</Col><Col id=\"Col01\">ㅸ</Col><Col id=\"Col02\">ㆄ</Col><Col id=\"Col03\">½</Col><Col id=\"Col04\">＃</Col><Col id=\"Col05\">＆</Col><Col id=\"Col06\">＊</Col><Col id=\"Col07\">＠</Col><Col id=\"Col08\">§</Col><Col id=\"Col09\">※</Col><Col id=\"Col10\">☆</Col><Col id=\"Col11\">★</Col><Col id=\"Col12\">○</Col><Col id=\"Col13\">●</Col><Col id=\"Col14\">◎</Col></Row><Row><Col id=\"Col00\">◇</Col><Col id=\"Col01\">◆</Col><Col id=\"Col02\">□</Col><Col id=\"Col03\">■</Col><Col id=\"Col04\">△</Col><Col id=\"Col05\">▲</Col><Col id=\"Col06\">▽</Col><Col id=\"Col07\">▼</Col><Col id=\"Col08\">→</Col><Col id=\"Col09\">←</Col><Col id=\"Col10\">↑</Col><Col id=\"Col11\">↓</Col><Col id=\"Col12\">↔</Col><Col id=\"Col13\">〓</Col><Col id=\"Col14\">◁</Col></Row><Row><Col id=\"Col00\">◀</Col><Col id=\"Col01\">▷</Col><Col id=\"Col02\">▶</Col><Col id=\"Col03\">♤</Col><Col id=\"Col04\">♠</Col><Col id=\"Col05\">♡</Col><Col id=\"Col06\">♥</Col><Col id=\"Col07\">♧</Col><Col id=\"Col08\">♣</Col><Col id=\"Col09\">⊙</Col><Col id=\"Col10\">◈</Col><Col id=\"Col11\">▣</Col><Col id=\"Col12\">◐</Col><Col id=\"Col13\">◑</Col><Col id=\"Col14\">▒</Col></Row><Row><Col id=\"Col00\">▤</Col><Col id=\"Col01\">▥</Col><Col id=\"Col02\">▨</Col><Col id=\"Col03\">▧</Col><Col id=\"Col04\">▦</Col><Col id=\"Col05\">▩</Col><Col id=\"Col06\">♨</Col><Col id=\"Col07\">☏</Col><Col id=\"Col08\">☎</Col><Col id=\"Col09\">☜</Col><Col id=\"Col10\">☞</Col><Col id=\"Col11\">¶</Col><Col id=\"Col12\">†</Col><Col id=\"Col13\">‡</Col><Col id=\"Col14\">↕</Col></Row><Row><Col id=\"Col00\">↗</Col><Col id=\"Col01\">↙</Col><Col id=\"Col02\">↖</Col><Col id=\"Col03\">↘</Col><Col id=\"Col04\">♭</Col><Col id=\"Col05\">♩</Col><Col id=\"Col06\">♪</Col><Col id=\"Col07\">♬</Col><Col id=\"Col08\">㉿</Col><Col id=\"Col09\">㈜</Col><Col id=\"Col10\">№</Col><Col id=\"Col11\">㏇</Col><Col id=\"Col12\">™</Col><Col id=\"Col13\">㏂</Col><Col id=\"Col14\">㏘</Col></Row><Row><Col id=\"Col00\">℡</Col><Col id=\"Col01\">＂</Col><Col id=\"Col02\">〔</Col><Col id=\"Col03\">〕</Col><Col id=\"Col04\">〈</Col><Col id=\"Col05\">〉</Col><Col id=\"Col06\">‘</Col><Col id=\"Col07\">’</Col><Col id=\"Col08\">“</Col><Col id=\"Col09\">”</Col><Col id=\"Col10\">《</Col><Col id=\"Col11\">》</Col><Col id=\"Col12\">「</Col><Col id=\"Col13\">」</Col><Col id=\"Col14\">『</Col></Row><Row><Col id=\"Col00\">』</Col><Col id=\"Col01\">【</Col><Col id=\"Col02\">】</Col><Col id=\"Col03\">＄</Col><Col id=\"Col04\">％</Col><Col id=\"Col05\">￦</Col><Col id=\"Col06\">℃</Col><Col id=\"Col07\">Å</Col><Col id=\"Col08\">￠</Col><Col id=\"Col09\">￥</Col><Col id=\"Col10\">℉</Col><Col id=\"Col11\">ℓ</Col><Col id=\"Col12\">㎘</Col><Col id=\"Col13\">㏄</Col><Col id=\"Col14\">㎣</Col></Row><Row><Col id=\"Col00\">㎤</Col><Col id=\"Col01\">㎥</Col><Col id=\"Col02\">㎦</Col><Col id=\"Col03\">Ω</Col><Col id=\"Col04\">Θ</Col><Col id=\"Col05\">Ξ</Col><Col id=\"Col06\">Σ</Col><Col id=\"Col07\">Φ</Col><Col id=\"Col08\">Ψ</Col><Col id=\"Col09\">Ω</Col><Col id=\"Col10\">α</Col><Col id=\"Col11\">β</Col><Col id=\"Col12\">γ</Col><Col id=\"Col13\">π</Col><Col id=\"Col14\">χ</Col></Row><Row><Col id=\"Col00\">ψ</Col><Col id=\"Col01\">ω</Col><Col id=\"Col02\">＋</Col><Col id=\"Col03\">－</Col><Col id=\"Col04\">＜</Col><Col id=\"Col05\">＝</Col><Col id=\"Col06\">＞</Col><Col id=\"Col07\">±</Col><Col id=\"Col08\">×</Col><Col id=\"Col09\">÷</Col><Col id=\"Col10\">≠</Col><Col id=\"Col11\">≤</Col><Col id=\"Col12\">≥</Col><Col id=\"Col13\">∞</Col><Col id=\"Col14\">∴</Col></Row><Row><Col id=\"Col00\">♂</Col><Col id=\"Col01\">♀</Col><Col id=\"Col02\">∠</Col><Col id=\"Col03\">⊥</Col><Col id=\"Col04\">⌒</Col><Col id=\"Col05\">∂</Col><Col id=\"Col06\">∇</Col><Col id=\"Col07\">≡</Col><Col id=\"Col08\">≒</Col><Col id=\"Col09\">≪</Col><Col id=\"Col10\">≫</Col><Col id=\"Col11\">√</Col><Col id=\"Col12\">∽</Col><Col id=\"Col13\">∝</Col><Col id=\"Col14\">∵</Col></Row><Row><Col id=\"Col00\">∫</Col><Col id=\"Col01\">∬</Col><Col id=\"Col02\">∈</Col><Col id=\"Col03\">∋</Col><Col id=\"Col04\">⊆</Col><Col id=\"Col05\">⊇</Col><Col id=\"Col06\">⊂</Col><Col id=\"Col07\">⊃</Col><Col id=\"Col08\">∪</Col><Col id=\"Col09\">∩</Col><Col id=\"Col10\">∧</Col><Col id=\"Col11\">∨</Col><Col id=\"Col12\">￢</Col><Col id=\"Col13\">⇒</Col><Col id=\"Col14\">⇔</Col></Row><Row><Col id=\"Col00\">∀</Col><Col id=\"Col01\">∃</Col><Col id=\"Col02\">∮</Col><Col id=\"Col03\">∑</Col><Col id=\"Col04\">∏</Col><Col id=\"Col05\">／</Col><Col id=\"Col06\">！</Col><Col id=\"Col07\">？</Col><Col id=\"Col08\">＿</Col><Col id=\"Col09\">￣</Col><Col id=\"Col10\">‥</Col><Col id=\"Col11\">…</Col><Col id=\"Col12\">〃</Col><Col id=\"Col13\">＼</Col><Col id=\"Col14\">∼</Col></Row><Row><Col id=\"Col00\">～</Col><Col id=\"Col01\">㉠</Col><Col id=\"Col02\">㉡</Col><Col id=\"Col03\">㉢</Col><Col id=\"Col04\">㉣</Col><Col id=\"Col05\">㉤</Col><Col id=\"Col06\">㉥</Col><Col id=\"Col07\">㉦</Col><Col id=\"Col08\">㉧</Col><Col id=\"Col09\">㉨</Col><Col id=\"Col10\">㉩</Col><Col id=\"Col11\">㉪</Col><Col id=\"Col12\">㉫</Col><Col id=\"Col13\">㉬</Col><Col id=\"Col14\">㉭</Col></Row><Row><Col id=\"Col00\">㉮</Col><Col id=\"Col01\">㉯</Col><Col id=\"Col02\">㉰</Col><Col id=\"Col03\">㉱</Col><Col id=\"Col04\">㉲</Col><Col id=\"Col05\">㉳</Col><Col id=\"Col06\">㉴</Col><Col id=\"Col07\">㉵</Col><Col id=\"Col08\">㉶</Col><Col id=\"Col09\">㉷</Col><Col id=\"Col10\">㉸</Col><Col id=\"Col11\">㉹</Col><Col id=\"Col12\">㉺</Col><Col id=\"Col13\">㉻</Col><Col id=\"Col14\"/></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_font", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"text\" type=\"STRING\" size=\"256\"/><Column id=\"font\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"text\">굴림 (가나다라)</Col><Col id=\"code\">굴림</Col><Col id=\"font\">antialias 10 굴림</Col></Row><Row><Col id=\"text\">바탕 (가나다라)</Col><Col id=\"code\">바탕</Col><Col id=\"font\">antialias 10 바탕</Col></Row><Row><Col id=\"text\">돋움 (가나다라)</Col><Col id=\"code\">돋움</Col><Col id=\"font\">antialias 10 돋움</Col></Row><Row><Col id=\"text\">궁서 (가나다라)</Col><Col id=\"code\">궁서</Col><Col id=\"font\">antialias 10 궁서</Col></Row><Row><Col id=\"text\">맑은 고딕 (가나다라)</Col><Col id=\"code\">맑은 고딕</Col><Col id=\"font\">antialias 10 맑은 고딕</Col></Row><Row><Col id=\"text\">Arial (abcd)</Col><Col id=\"code\">Arial</Col><Col id=\"font\">antialias 10 Arial</Col></Row><Row><Col id=\"code\">Arial Black</Col><Col id=\"text\">Arial Black (abcd)</Col><Col id=\"font\">antialias 10 Arial Black</Col></Row><Row><Col id=\"text\">Times New Roman (abcd)</Col><Col id=\"code\">Times New Roman</Col><Col id=\"font\">antialias 10 Times New Roman</Col></Row><Row><Col id=\"text\">Tahoma (abcd)</Col><Col id=\"code\">Tahoma</Col><Col id=\"font\">antialias 10 Tahoma</Col></Row><Row><Col id=\"text\">Verdana (abcd)</Col><Col id=\"code\">Verdana</Col><Col id=\"font\">antialias 10 Verdana</Col></Row><Row><Col id=\"text\">Courier New (abcd)</Col><Col id=\"code\">Courier New</Col><Col id=\"font\">antialias 10 Courier New</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_tableBoderRange", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"icon\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">all</Col><Col id=\"value\">Line All</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl01.png&apos;)</Col></Row><Row><Col id=\"code\">out</Col><Col id=\"value\">Outline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl02.png&apos;)</Col></Row><Row><Col id=\"code\">in</Col><Col id=\"value\">Inline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl03.png&apos;)</Col></Row><Row><Col id=\"code\">top</Col><Col id=\"value\">Topline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl04.png&apos;)</Col></Row><Row><Col id=\"code\">bottom</Col><Col id=\"value\">Bottomline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl05.png&apos;)</Col></Row><Row><Col id=\"code\">left</Col><Col id=\"value\">Leftline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl06.png&apos;)</Col></Row><Row><Col id=\"code\">right</Col><Col id=\"value\">Rightline</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl07.png&apos;)</Col></Row><Row><Col id=\"code\">none</Col><Col id=\"value\">Line None</Col><Col id=\"icon\">url(&apos;imagerc::richtexteditor/grd_editor_tbl08.png&apos;)</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_template", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"html\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;320&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&#9;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&#9;&lt;td width=&quot;337&quot; height=&quot;320&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;  &lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;680&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;font-family: dotum; vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;680&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;font-family: dotum; vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td class=&quot;area_type&quot; style=&quot;width: 338px; height: 157px; vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td style=&quot;width: 5px; height: 324px; font-size: 0px;&quot; rowspan=&quot;3&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td class=&quot;area_type&quot; style=&quot;width: 338px; height: 322px; vertical-align: top;&quot; rowspan=&quot;3&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;width: 338px; height: 5px; font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td class=&quot;area_type&quot; style=&quot;width: 337px; height: 158px; vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;320&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot; rowspan=&quot;3&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot; rowspan=&quot;3&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;338&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;337&quot; height=&quot;158&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot; vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;338&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot; colspan=&quot;3&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;337&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;337&quot; height=&quot;157&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;319&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot; rowspan=&quot;5&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot; rowspan=&quot;5&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot; rowspan=&quot;5&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;338&quot; height=&quot;319&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot; rowspan=&quot;5&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row><Row><Col id=\"html\">&lt;table border=&quot;0&quot; cellspacing=&quot;0&quot; cellpadding=&quot;0&quot;&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot; colspan=&quot;3&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td height=&quot;5&quot; style=&quot;font-size: 0px;&quot; colspan=&quot;3&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td width=&quot;338&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;td width=&quot;5&quot; style=&quot;font-size: 0px;&quot;&gt;&amp;nbsp;&lt;/td&gt;&lt;td width=&quot;337&quot; height=&quot;103&quot; class=&quot;area_type&quot; style=&quot;vertical-align: top;&quot;&gt;내용을 입력해주세요.&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt;&lt;p&gt;&amp;nbsp;&lt;/p&gt;</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_tableBoderType", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">none</Col><Col id=\"value\"> Outline less</Col></Row><Row><Col id=\"code\">solid</Col><Col id=\"value\">  ─────</Col></Row><Row><Col id=\"code\">dotted</Col><Col id=\"value\">  ……………</Col></Row><Row><Col id=\"code\">dashed</Col><Col id=\"value\">  ---------</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_outfiles", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_highlight", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">javascript</Col></Row><Row><Col id=\"code\">java</Col></Row><Row><Col id=\"code\">xml/html</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_images", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"filename\" type=\"STRING\" size=\"256\"/><Column id=\"filesize\" type=\"INT\" size=\"256\"/><Column id=\"savefilename\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_deleteImage", this);
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"filename\" type=\"STRING\" size=\"256\"/><Column id=\"filesize\" type=\"INT\" size=\"256\"/><Column id=\"savefilename\" type=\"STRING\" size=\"256\"/><Column id=\"index\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new FileUpTransfer("fileUpTrans", this);
            this.addChild(obj.name, obj);


            obj = new FileDialog("fileDlg", this);
            obj.set_filter("Images(*.jpg;*.jpeg;*.gif;*.png;*.bmp)|*.jpg;*.jpeg;*.gif;*.png;*.bmp");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("st_editor","0","0",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_visible("false");
            obj.set_cssclass("WF_sta_editor");
            this.addChild(obj.name, obj);

            obj = new Static("st_thumbnail","0","542",null,"152","0",null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_cssclass("WF_sta_thumbBox");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_tableLayout","559","737","185","363",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","0","0","185","346",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("19");
            obj.set_cssclass("Editor_sta_box");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Grid("grd_tableLayout","12","142","162","162",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("10");
            obj.set_binddataset("ds_tableLayout");
            obj.getSetter("scrollbars").set("none");
            obj.getSetter("useinputpanel").set("false");
            obj.set_useselcolor("false");
            obj.set_selecttype("cell");
            obj.set_cssclass("Editor_grd_pop2");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/></Columns><Rows><Row size=\"16\"/></Rows><Band id=\"body\"><Cell displaytype=\"normal\" text=\"bind:Column0\"/><Cell col=\"1\" text=\"bind:Column1\"/><Cell col=\"2\" text=\"bind:Column2\"/><Cell col=\"3\" text=\"bind:Column3\"/><Cell col=\"4\" text=\"bind:Column4\"/><Cell col=\"5\" text=\"bind:Column5\"/><Cell col=\"6\" text=\"bind:Column6\"/><Cell col=\"7\" text=\"bind:Column7\"/><Cell col=\"8\" text=\"bind:Column8\"/><Cell col=\"9\" text=\"bind:Column9\"/></Band></Format></Formats>");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Div("div_selected","12","142","0","0",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("11");
            obj.getSetter("scrollbars").set("none");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Grid("grd_tableLayout","0","0","161","161",null,null,null,null,null,null,this.div_tableLayout.form.div_selected.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_tableLayout");
            obj.getSetter("scrollbars").set("none");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_selecttype("cell");
            obj.set_scrollbartype("none none");
            obj.set_scrolltype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/><Column size=\"16\"/></Columns><Rows><Row size=\"16\"/></Rows><Band id=\"body\"><Cell text=\"bind:Column0\" background=\"#2462af\"/><Cell col=\"1\" text=\"bind:Column1\" background=\"#2462af\"/><Cell col=\"2\" text=\"bind:Column2\" background=\"#2462af\"/><Cell col=\"3\" text=\"bind:Column3\" background=\"#2462af\"/><Cell col=\"4\" text=\"bind:Column4\" background=\"#2462af\"/><Cell col=\"5\" text=\"bind:Column5\" background=\"#2462af\"/><Cell col=\"6\" text=\"bind:Column6\" background=\"#2462af\"/><Cell col=\"7\" text=\"bind:Column7\" background=\"#2462af\"/><Cell col=\"8\" text=\"bind:Column8\" background=\"#2462af\"/><Cell col=\"9\" text=\"bind:Column9\" background=\"#2462af\"/></Band></Format></Formats>");
            this.div_tableLayout.form.div_selected.addChild(obj.name, obj);

            obj = new Static("st_tableLayout","16","122","45","20",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("12");
            obj.set_text("Table");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Static("st_row","58","122","20","20",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("20");
            obj.set_text("0");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Static("st_tableLayout00","81","122","11","20",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("14");
            obj.set_text("x");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Static("st_col","90","122","20","20",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("21");
            obj.set_text("0");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_close","56","314","71","21",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("16");
            obj.set_text("Cancel");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Static("st_tableLayout01","16","9","138","20",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("28");
            obj.set_text("Table template");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template0","10","31","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("29");
            obj.set_cssclass("Editor_btn_table01");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template2","93","31","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("30");
            obj.set_cssclass("Editor_btn_table02");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template3","93","60","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("31");
            obj.set_cssclass("Editor_btn_table04");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template1","10","60","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("32");
            obj.set_cssclass("Editor_btn_table03");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template5","93","89","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("33");
            obj.set_cssclass("Editor_btn_table06");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Button("btn_template4","10","89","82","28",null,null,null,null,null,null,this.div_tableLayout.form);
            obj.set_taborder("34");
            obj.set_cssclass("Editor_btn_table05");
            this.div_tableLayout.addChild(obj.name, obj);

            obj = new Div("div_fontsize","973","96","410","259",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","0","0",null,null,"0","0",null,null,null,null,this.div_fontsize.form);
            obj.set_taborder("1");
            obj.set_cssclass("Editor_sta_box");
            this.div_fontsize.addChild(obj.name, obj);

            obj = new Grid("grd_font","36","8",null,null,"0","0",null,null,null,null,this.div_fontsize.form);
            obj.set_cssclass("Editor_grd_pop");
            obj.set_taborder("0");
            obj.set_binddataset("ds_fontsize");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_extendsizetype("row");
            obj.set_autofittype("col");
            obj.set_autosizingtype("row");
            obj.set_useselcolor("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"345\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"normal\" text=\"bind:text\" cssclass=\"bind:fontclass\"/></Band></Format></Formats>");
            this.div_fontsize.addChild(obj.name, obj);

            obj = new Div("div_font","770","72","182","278",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","181","271",null,null,null,null,null,null,this.div_font.form);
            obj.set_taborder("1");
            obj.set_cssclass("Editor_sta_box");
            this.div_font.addChild(obj.name, obj);

            obj = new Grid("grd_font","8","3","163","264",null,null,null,null,null,null,this.div_font.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_font");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_useselcolor("false");
            obj.set_cssclass("Editor_grd_pop");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"161\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"normal\" text=\"bind:text\"/></Band></Format></Formats>");
            this.div_font.addChild(obj.name, obj);

            obj = new Div("div_tableBoderRange","1157","644","139","319",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","139","319",null,null,null,null,null,null,this.div_tableBoderRange.form);
            obj.set_taborder("4");
            obj.set_cssclass("Editor_sta_box");
            this.div_tableBoderRange.addChild(obj.name, obj);

            obj = new Grid("grd_tableBoderRange","5","121","125","198",null,null,null,null,null,null,this.div_tableBoderRange.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_tableBoderRange");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_useselcolor("false");
            obj.set_cssclass("Editor_grd_pop");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"25\"/><Column size=\"87\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"imagecontrol\" text=\"bind:icon\"/><Cell col=\"1\" text=\"bind:value\"/></Band></Format></Formats>");
            this.div_tableBoderRange.addChild(obj.name, obj);

            obj = new Static("st_line","0","116","139","1",null,null,null,null,null,null,this.div_tableBoderRange.form);
            obj.set_taborder("2");
            this.div_tableBoderRange.addChild(obj.name, obj);

            obj = new Radio("rdo_type","6","1","113","114",null,null,null,null,null,null,this.div_tableBoderRange.form);
            obj.set_taborder("3");
            obj.set_columncount("0");
            obj.set_rowcount("4");
            obj.set_codecolumn("code");
            obj.set_datacolumn("value");
            obj.set_direction("vertical");
            obj.set_innerdataset("ds_tableBoderType");
            obj.set_value("none");
            obj.set_index("0");
            this.div_tableBoderRange.addChild(obj.name, obj);

            obj = new Div("div_tableBoderHeight","1163","496","117","135",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","117","135",null,null,null,null,null,null,this.div_tableBoderHeight.form);
            obj.set_taborder("2");
            obj.set_cssclass("Editor_sta_box");
            this.div_tableBoderHeight.addChild(obj.name, obj);

            obj = new Grid("grd_tableBoderHeight","3","8","111","121",null,null,null,null,null,null,this.div_tableBoderHeight.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_tableBoderHeight");
            obj.getSetter("scrollbars").set("none");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_autofittype("col");
            obj.set_useselcolor("false");
            obj.set_cssclass("Editor_grd_pop");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"text\" text=\"bind:value\"/><Cell col=\"1\" displaytype=\"imagecontrol\" text=\"bind:icon\"/></Band></Format></Formats>");
            this.div_tableBoderHeight.addChild(obj.name, obj);

            obj = new Div("div_template","786","982","204","108",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","204","108",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("8");
            obj.set_cssclass("Editor_sta_box");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template0","9","9","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("0");
            obj.set_cssclass("Editor_sta_tmpp01");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template1","54","9","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("1");
            obj.set_cssclass("Editor_sta_tmpp02");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template2","104","9","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("2");
            obj.set_cssclass("Editor_sta_tmpp03");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template3","154","9","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("3");
            obj.set_cssclass("Editor_sta_tmpp04");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template7","154","59","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("4");
            obj.set_cssclass("Editor_sta_tmpp08");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template6","104","59","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("5");
            obj.set_cssclass("Editor_sta_tmpp07");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template5","54","59","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("6");
            obj.set_cssclass("Editor_sta_tmpp06");
            this.div_template.addChild(obj.name, obj);

            obj = new Static("sta_template4","9","59","38","38",null,null,null,null,null,null,this.div_template.form);
            obj.set_taborder("7");
            obj.set_cssclass("Editor_sta_tmpp05");
            this.div_template.addChild(obj.name, obj);

            obj = new Div("div_blockquote","1056","981","311","170",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            obj.set_color("#46586e");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","311","170",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("23");
            obj.set_cssclass("Editor_sta_box");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote0","11","12","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("8");
            obj.set_text("blockquote");
            obj.set_border("1px dashed #acb8c7");
            obj.set_color("#46586e");
            obj.set_textAlign("center");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote1","112","12","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("9");
            obj.set_text("blockquote");
            obj.set_border("1px dashed #56e7ca");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote2","213","12","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("10");
            obj.set_text("blockquote");
            obj.set_border("1px dashed #8385ed");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote3","11","42","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("11");
            obj.set_text("blockquote");
            obj.set_border("1px dashed #998675");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote4","112","42","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("12");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_border("1px dashed #acb8c7");
            obj.set_background("#e4e5e9");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote5","213","42","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("13");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_border("1px solid #56e7ca");
            obj.set_color("#46586e");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote6","11","72","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("14");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("1px solid #56e7ca");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote7","112","72","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("15");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("1px solid #8385ed");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote8","213","72","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("16");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("1px solid #998675");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote9","11","102","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("17");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("1px solid #acb8c7");
            obj.set_background("#e4e5e9");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote10","112","102","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("18");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("2px solid #acb8c7");
            obj.set_background("#e4e5e9");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote11","213","102","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("19");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_border("0px none #acb8c7");
            obj.set_background("#e4e5e9");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote12","11","132","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("20");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_background("#aff4e6");
            obj.set_border("0px none #acb8c7");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote13","112","132","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("21");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_background("#afb1f4");
            obj.set_border("0px none #acb8c7");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Static("sta_blockquote14","213","132","86","26",null,null,null,null,null,null,this.div_blockquote.form);
            obj.set_taborder("22");
            obj.set_text("blockquote");
            obj.set_textAlign("center");
            obj.set_color("#46586e");
            obj.set_background("#fff799");
            obj.set_border("0px none #acb8c7");
            this.div_blockquote.addChild(obj.name, obj);

            obj = new Div("div_char","792","359","305","432",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","1","305","431",null,null,null,null,null,null,this.div_char.form);
            obj.set_taborder("3");
            obj.set_cssclass("Editor_sta_box");
            this.div_char.addChild(obj.name, obj);

            obj = new Static("Static26","12","7","120","20",null,null,null,null,null,null,this.div_char.form);
            obj.set_taborder("0");
            obj.set_text("Sign");
            this.div_char.addChild(obj.name, obj);

            obj = new Grid("grd_char","12","29","281","341",null,null,null,null,null,null,this.div_char.form);
            obj.set_taborder("1");
            obj.set_binddataset("ds_char");
            obj.getSetter("scrollbars").set("none");
            obj.getSetter("useinputpanel").set("false");
            obj.set_selecttype("cell");
            obj.set_autofittype("none");
            obj.set_cssclass("Editor_grd_pop2");
            obj.set_fillareatype("linerow");
            obj.set_scrollbartype("none none");
            obj.set_scrolltype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/><Column size=\"20\"/></Columns><Rows><Row size=\"20\"/></Rows><Band id=\"body\"><Cell text=\"bind:Col00\"/><Cell col=\"1\" text=\"bind:Col01\"/><Cell col=\"2\" text=\"bind:Col02\"/><Cell col=\"3\" text=\"bind:Col03\"/><Cell col=\"4\" text=\"bind:Col04\"/><Cell col=\"5\" text=\"bind:Col05\"/><Cell col=\"6\" text=\"bind:Col06\"/><Cell col=\"7\" text=\"bind:Col07\"/><Cell col=\"8\" text=\"bind:Col08\"/><Cell col=\"9\" text=\"bind:Col09\"/><Cell col=\"10\" text=\"bind:Col10\"/><Cell col=\"11\" text=\"bind:Col11\"/><Cell col=\"12\" text=\"bind:Col12\"/><Cell col=\"13\" text=\"bind:Col13\"/></Band></Format></Formats>");
            this.div_char.addChild(obj.name, obj);

            obj = new Static("sta_char","12","374","282","47",null,null,null,null,null,null,this.div_char.form);
            obj.set_taborder("2");
            this.div_char.addChild(obj.name, obj);

            obj = new Div("div_color","16","736","527","344",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            obj.set_url("techtip::richtexteditor_colorpicker.xfdl");
            this.addChild(obj.name, obj);

            obj = new Div("div_link","1144","416","223","66",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","223","66",null,null,null,null,null,null,this.div_link.form);
            obj.set_taborder("3");
            obj.set_cssclass("Editor_sta_box");
            this.div_link.addChild(obj.name, obj);

            obj = new Edit("edt_link","11","11","201","20",null,null,null,null,null,null,this.div_link.form);
            obj.set_taborder("0");
            obj.set_value("http://");
            this.div_link.addChild(obj.name, obj);

            obj = new Button("btn_apply","58","35","48","20",null,null,null,null,null,null,this.div_link.form);
            obj.set_taborder("1");
            obj.set_text("적용");
            this.div_link.addChild(obj.name, obj);

            obj = new Button("btn_close","111","35","48","20",null,null,null,null,null,null,this.div_link.form);
            obj.set_taborder("2");
            obj.set_text("닫기");
            this.div_link.addChild(obj.name, obj);

            obj = new Static("st_thumbnailInfo","0","542",null,"31","0",null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_cssclass("WF_sta_thumbtitle");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_editImage","791","812","280","141",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","280","141",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("26");
            obj.set_background("#e4e5e9");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static01","15","17","47","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("27");
            obj.set_text("Width");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Edit("edt_width","54","17","50","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("28");
            obj.set_inputtype("digit");
            obj.set_autoselect("true");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static02","108","17","40","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("29");
            obj.set_text("Hight");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static03","202","17","49","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("30");
            obj.set_text("Reset");
            this.div_editImage.addChild(obj.name, obj);

            obj = new CheckBox("chk_ratio","15","46","150","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("31");
            obj.set_text("Keep aspect ratio");
            obj.set_value("true");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static04","15","76","54","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("32");
            obj.set_text("Stroke");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static05","118","76","66","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("33");
            obj.set_text("Line Type");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Static("Static06","15","105","39","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("34");
            obj.set_text("Align");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Edit("edt_height","145","17","50","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("35");
            obj.set_inputtype("digit");
            obj.set_autoselect("true");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Button("btn_reset","243","16","20","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("36");
            obj.set_cssclass("Editor_btn_reset");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Spin("spn_borderWidth","59","76","50","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("37");
            obj.getSetter("ontextchanged").set("div_editImage_spn_borderWidth_ontextchanged");
            obj.set_value("2");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Combo("cmb_borderStyle","182","76","87","20",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("38");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var div_editImage_form_cmb_borderStyle_innerdataset = new nexacro.NormalDataset("div_editImage_form_cmb_borderStyle_innerdataset", obj);
            div_editImage_form_cmb_borderStyle_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">none</Col><Col id=\"datacolumn\">none</Col></Row><Row><Col id=\"codecolumn\">solid</Col><Col id=\"datacolumn\">solid</Col></Row><Row><Col id=\"codecolumn\">dotted</Col><Col id=\"datacolumn\">dotted</Col></Row><Row><Col id=\"codecolumn\">dashed</Col><Col id=\"datacolumn\">dashed</Col></Row><Row><Col id=\"codecolumn\">double</Col><Col id=\"datacolumn\">double</Col></Row><Row><Col id=\"codecolumn\">groove</Col><Col id=\"datacolumn\">groove</Col></Row><Row><Col id=\"codecolumn\">ridge</Col><Col id=\"datacolumn\">ridge</Col></Row><Row><Col id=\"codecolumn\">inset</Col><Col id=\"datacolumn\">inset</Col></Row><Row><Col id=\"codecolumn\">outset</Col><Col id=\"datacolumn\">outset</Col></Row></Rows>");
            obj.set_innerdataset(div_editImage_form_cmb_borderStyle_innerdataset);
            this.div_editImage.addChild(obj.name, obj);

            obj = new Button("btn_none","59","104","22","22",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("39");
            obj.set_cssclass("Editor_btn_algnOcc");
            obj.set_tooltiptext("정렬 없음");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Button("btn_left","82","104","22","22",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("40");
            obj.set_cssclass("Editor_btn_algnL");
            obj.set_tooltiptext("왼쪽 맞춤");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Button("btn_right","105","104","22","22",null,null,null,null,null,null,this.div_editImage.form);
            obj.set_taborder("41");
            obj.set_cssclass("Editor_btn_algnR");
            obj.set_tooltiptext("오른쪽 맞춤");
            this.div_editImage.addChild(obj.name, obj);

            obj = new Div("div_thumbnail","1","574",null,"118","1",null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Div("div_prog","1158","340","210","66",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_cssclass("POP_div_bg");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00","5","3","200","60",null,null,null,null,null,null,this.div_prog.form);
            obj.set_taborder("0");
            obj.set_background("url(\'imagerc::richtexteditor/loading.gif\')");
            this.div_prog.addChild(obj.name, obj);

            obj = new Div("div_highlight","1394","80","120","84",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.getSetter("scrollbars").set("none");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","120","84",null,null,null,null,null,null,this.div_highlight.form);
            obj.set_taborder("1");
            obj.set_cssclass("Editor_sta_box");
            this.div_highlight.addChild(obj.name, obj);

            obj = new Grid("grd_highlight","8","3","100","75",null,null,null,null,null,null,this.div_highlight.form);
            obj.set_cssclass("Editor_grd_pop");
            obj.set_taborder("2");
            obj.set_binddataset("ds_highlight");
            obj.set_readonly("true");
            obj.getSetter("useinputpanel").set("false");
            obj.set_useselcolor("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell displaytype=\"normal\" text=\"bind:code\"/></Band></Format></Formats>");
            this.div_highlight.addChild(obj.name, obj);

            obj = new Div("div_toolbar","2","1",null,"30","2",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_visible("false");
            obj.set_formscrollbartype("none none");
            obj.set_formscrolltype("none");
            this.addChild(obj.name, obj);

            obj = new Button("btn_template","547","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("2");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("템플릿");
            obj.set_cssclass("Editor_btn_layout");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_highlight","617","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("10");
            obj.getSetter("position").set("absolute");
            obj.set_cssclass("Editor_btn_highlight");
            obj.set_visible("false");
            obj.set_tooltiptext("코드 하이라이트");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_left","330","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("12");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("왼쪽 맞춤");
            obj.set_cssclass("Editor_btn_alignL");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_center","353","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("13");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("가운데 맞춤");
            obj.set_cssclass("Editor_btn_alignC");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_right","376","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("14");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("오른쪽 맞춤");
            obj.set_cssclass("Editor_btn_alignR");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_full","399","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("15");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("양쪽 맞춤");
            obj.set_cssclass("Editor_btn_alignJ");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_indentout","422","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("16");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("내어쓰기");
            obj.set_cssclass("Editor_btn_justL");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_indentin","445","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("17");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("들여쓰기");
            obj.set_cssclass("Editor_btn_justR");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_numberlist","468","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("18");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("번호 매기기");
            obj.set_cssclass("Editor_btn_listOdr");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_marklist","491","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("19");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("글머리 기호");
            obj.set_cssclass("Editor_btn_list");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_linkdel","640","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("21");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("링크 삭제");
            obj.set_cssclass("Editor_btn_linkDel");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_link","640","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("20");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("링크");
            obj.set_cssclass("Editor_btn_link");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_bkcolor","195","4","32","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("26");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("폰트 배경색");
            obj.set_cssclass("Editor_btn_bgclr2");
            obj.set_text("■");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_color","162","4","32","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("25");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("폰트색");
            obj.set_cssclass("Editor_btn_ftclr");
            obj.set_text("■");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_bold","228","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("27");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("굵게");
            obj.set_cssclass("Editor_btn_bold");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_italic","251","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("28");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("기울임꼴");
            obj.set_cssclass("Editor_btn_italic");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_underline","274","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("29");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("밑줄");
            obj.set_cssclass("Editor_btn_underline");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_strikechar","297","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("30");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("취소선");
            obj.set_cssclass("Editor_btn_strike");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_specialchar","594","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("34");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("기호 넣기");
            obj.set_cssclass("Editor_btn_symbol");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_layoutTable","524","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("36");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("표 추가");
            obj.set_cssclass("Editor_btn_grid");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_font","2","4","102","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("22");
            obj.set_text("FONT");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("글꼴");
            obj.set_cssclass("Editor_btn_font");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_fontsize","105","4","56","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("23");
            obj.set_text("SIZE");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("크기");
            obj.set_cssclass("Editor_btn_size");
            obj.set_visible("false");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_merge","4","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("37");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("병합");
            obj.set_cssclass("Editor_btn_algn01");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_resetMerge","29","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("38");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("분할");
            obj.set_cssclass("Editor_btn_algn02");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_insertRowAbove","54","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("39");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("위로 추가");
            obj.set_cssclass("Editor_btn_algn03");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_insertRowBelow","79","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("40");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("아래로 추가");
            obj.set_cssclass("Editor_btn_algn04");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_insertColLeft","104","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("41");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("좌측으로 추가");
            obj.set_cssclass("Editor_btn_algn05");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_insertColRight","129","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("42");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("우측으로 추가");
            obj.set_cssclass("Editor_btn_algn06");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_deleteRow","154","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("43");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("행 삭제");
            obj.set_cssclass("Editor_btn_algn07");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_deleteCol","179","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("44");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("열 삭제");
            obj.set_cssclass("Editor_btn_algn08");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_tablebgcolor","291","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("49");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("테이블 배경색");
            obj.set_cssclass("Editor_btn_bgclr");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_tablebdcolor","216","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("45");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("선색");
            obj.set_cssclass("Editor_penclr");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_tablebdheight","241","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("46");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("선두께");
            obj.set_cssclass("Editor_btn_bdsize");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_tablebdrange","266","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("48");
            obj.getSetter("position").set("absolute");
            obj.set_tooltiptext("선테두리");
            obj.set_cssclass("Editor_btn_grid2");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_editTable",null,"1","20","29","0",null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("50");
            obj.set_cssclass("Editor_btn_dn");
            obj.set_visible("true");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_image","663","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("52");
            obj.set_cssclass("Editor_btn_image");
            obj.set_visible("false");
            obj.set_tooltiptext("이미지");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_blockquote","570","4","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("53");
            obj.set_visible("false");
            obj.set_tooltiptext("인용구");
            obj.set_cssclass("Editor_btn_quo");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_verticaltop","322","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("54");
            obj.set_visible("false");
            obj.set_tooltiptext("상단 정렬");
            obj.set_cssclass("Editor_btn_alignT");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_verticalmiddle","345","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("55");
            obj.set_visible("false");
            obj.set_tooltiptext("중단 정렬");
            obj.set_cssclass("Editor_btn_alignM");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new Button("btn_verticalbottom","368","34","22","22",null,null,null,null,null,null,this.div_toolbar.form);
            obj.set_taborder("56");
            obj.set_visible("false");
            obj.set_tooltiptext("하단 정렬");
            obj.set_cssclass("Editor_btn_alignB");
            this.div_toolbar.addChild(obj.name, obj);

            obj = new TextArea("txt_htmlEditor","0","30",null,null,"0","26",null,null,null,null,this);
            obj.set_taborder("3");
            obj.getSetter("wordwrap").set("char");
            obj.getSetter("position").set("absolute");
            obj.set_visible("false");
            obj.set_cssclass("Editor_tex_none");
            this.addChild(obj.name, obj);

            obj = new WebBrowser("web_editor","0","30",null,null,"0","26",null,null,null,null,this);
            obj.set_taborder("1");
            obj.getSetter("onerror").set("web_editor_onerror");
            obj.getSetter("position").set("absolute");
            this.addChild(obj.name, obj);

            obj = new Div("div_mode","1",null,null,"25","1","2",null,null,null,null,this);
            obj.set_taborder("2");
            obj.getSetter("position").set("absolute");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit","4","0","102","21",null,null,null,null,null,null,this.div_mode.form);
            obj.set_taborder("4");
            obj.set_text("Editor");
            obj.set_cssclass("Editor_tab");
            this.div_mode.addChild(obj.name, obj);

            obj = new Button("btn_src","107","0","102","21",null,null,null,null,null,null,this.div_mode.form);
            obj.set_taborder("5");
            obj.set_text("HTML");
            obj.set_cssclass("Editor_tab");
            this.div_mode.addChild(obj.name, obj);

            obj = new Edit("edt_focus","0","0","0","0",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",this._adjust_width,this._adjust_height,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","div_fieldSet.edt_width","value","ds_field","width");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","div_fieldSet.edt_height","value","ds_field","height");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","div_fieldSet.edt_title","value","ds_field","title");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","div_fieldSet.edt_left","value","ds_field","left");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","div_fieldSet.edt_right","value","ds_field","right");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","div_fieldSet.edt_bgcolor","value","ds_field","bgcolor");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","div_fieldSet.edt_bordercolor","value","ds_field","bordercolor");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","div_fieldSet.cmb_unit","value","ds_field","unit");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","div_fieldSet.cmb_align","value","ds_field","align");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","div_fieldSet.edt_color","value","ds_field","color");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item10","div_fieldSet.edt_top","value","ds_field","top");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item11","div_fieldSet.edt_bottom","value","ds_field","bottom");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item26","div_fieldSet.edt_border","value","ds_field","border");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item27","div_fieldSet.edo_borderstyle","value","ds_field","borderstyle");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl","techtip::richtexteditor_colorpicker.xfdl");
        };
        
        // User Script
        this.addIncludeScript("richtexteditor.xfdl","lib::lib_base.xjs");
        this.addIncludeScript("richtexteditor.xfdl","lib::lib_array.xjs");
        this.addIncludeScript("richtexteditor.xfdl","lib::lib_color.xjs");
        this.registerScript("richtexteditor.xfdl", function() {
        this.executeIncludeScript("lib::lib_base.xjs"); /*include "lib::lib_base.xjs"*/;
        this.executeIncludeScript("lib::lib_array.xjs"); /*include "lib::lib_array.xjs"*/;
        this.executeIncludeScript("lib::lib_color.xjs"); /*include "lib::lib_color.xjs"*/;

        /**
         * Rich Text Editor
         */
        var caller = this;
        var emptyHtml = "";
        var brHtml = "";

        if ( (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11) || nexacro._Browser == "Runtime" )
        {
        	brHtml = "<p>&nbsp;</p>";
        }
        else
        {
        	brHtml = "<p><br></p>";
        }

        var editMode = "EDIT";
        var editChangeValue = emptyHtml;
        var openedDiv;
        var toolbarHeightOffset = 30;

        // 썸네일 이미지 설정
        var imageDivList = [];
        var imageList = [];
        var selBtnList = [];
        var addBtnList = [];
        var rmBtnList = [];
        var imgMaxCount = 6;
        var imgRect = {"left": 10, "top": 10, "width": 100, "height": 100};
        var imgOffset = {"x": 10, "y": 10};
        var selBtnRect = {"x": 5, "y": 5, "width": 19, "height": 17};
        var addBtnRect = {"x": 28, "y": 5, "width": 19, "height": 17};
        var rmBtnRect = {"x": 82, "y": 7, "width": 13, "height": 13};
        var selectedImage;

        // 편집 기본 설정
        var initConfig = {
        	editor : {
        		// editor.html 의 경로
        		url : "http://localhost:8888/nexaui/RichTextEditor17/file/richtexteditor/html/editor.html",

        		// 툴바 영역을 보일지 여부
        		showToolbar : true,

        		// 툴바에 사용할 기능 ( | : 구분선, \n : 개행 )
        		toolbarButtons : [
        			"font", "fontsize", "color", "bkcolor", "bold", "italic", "underline", "strikechar", "|",
        			"left", "center", "right", "full", "indentout", "indentin", "numberlist", "marklist", "|",
        			"layoutTable", "template", "blockquote", "specialchar", "highlight", "link", "image", "\n",
        			"merge" ,"resetMerge" ,"insertRowAbove" ,"insertRowBelow" ,"insertColLeft" ,"insertColRight" ,"deleteRow" ,"deleteCol", "|",
        			"verticaltop", "verticalmiddle", "verticalbottom", "|", "tablebdcolor", "tablebdheight", "tablebdrange", "tablebgcolor"
        		],

        		// HTML 편집모드을 보일지 여부
        		showEditMode : true,

        		// 에디터의 초기화가 완료된 후 호출되는 callback 함수
        		loadCallback : null,

        		// 에디터의 사이즈가 변경될 때 호출되는 callback 함수
        		resizeCallback : null,

        		// 에디터 초기화 시 본문 영역의 포커스 여부
        		useInitFocus: true
        	},
        	table: {
        		// 표의 기본 너비
        		width: 690,

        		// 행의 기본 높이
        		tdheight: 24,

        		// table style
        		style: "border:none; border-collapse:collapse; font-family: Verdana, malgun gothic; font-size: 10pt;",

        		// 표 헤더 기본 border style
        		headBorderStyle: "1px solid #93a5ba",

        		// 표 헤더 기본 background color
        		headBackgroundColor: "#ffffff",

        		// 표 헤더 기본 color
        		headColor: "#46586e",

        		// 표 바디 기본 border style
        		bodyBorderStyle: "1px solid #93a5ba",

        		// 표 바디 기본 background color
        		bodyBackgroundColor: "#ffffff",

        		// 표 바디 기본 color
        		bodyColor: "#46586e"
        	},
        	image : {
        		// 이미지 파일을 등록할 host 경로
        		host : "http://localhost/RichTextEditor17/",

        		// 이미지 파일 업로드 url 로 host 를 제외한 경로 지정.
        		uploadUrl : "ui/file/richtexteditor/jsp/saveFile.jsp?path=repository",

        		// 이미지 파일 삭제 url 로 host 를 제외한 경로 지정.
        		deleteUrl : "ui/file/richtexteditor/jsp/deleteFile.jsp?path=repository",

        		// 본문에 추가될 url 로 host 를 제외한 경로 지정.
        		src : "ui/file/richtexteditor/repository/",

        		// 허용 가능한 확장자 지정.
        		allowTypes : ["jpg","jpeg","gif","png","bmp"],

        		// 등록 가능한 최대 개수 지정.
        		maxCount : 30,

        		// 개별 이미지 업로드 최대 크기 지정.
        		maxSize : "3MB",

        		// 개별 이미지 업로드 최대 크기 지정.
        		maxTotalSize : "90MB"
        	}
        };

        // Table Template Style
        var tableTemplateStyles = 	[
        	{
        		headBorderStyle: "1px solid #93a5ba",
        		headBackgroundColor: "#e8ecf0",
        		headColor: "#46586e",
        		bodyBorderStyle: "1px solid #93a5ba",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	},
        	{
        		headBorderStyle: "1px solid #46586e",
        		headBackgroundColor: "#8385ed",
        		headColor: "#ffffff",
        		bodyBorderStyle: "1px solid #46586e",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	},
        	{
        		headBorderStyle: "1px solid #5659e7",
        		headBackgroundColor: "#5a718d",
        		headColor: "#ffffff",
        		bodyBorderStyle: "1px solid #5659e7",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	},
        	{
        		headBorderStyle: "1px solid #1a9dbc",
        		headBackgroundColor: "#28bee1",
        		headColor: "#ffffff",
        		bodyBorderStyle: "1px solid #1a9dbc",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	},
        	{
        		headBorderStyle: "1px solid #e4881f",
        		headBackgroundColor: "#f79a00",
        		headColor: "#ffffff",
        		bodyBorderStyle: "1px solid #e4881f",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	},
        	{
        		headBorderStyle: "1px solid #9eb809",
        		headBackgroundColor: "#bcd71e",
        		headColor: "#ffffff",
        		bodyBorderStyle: "1px solid #9eb809",
        		bodyBackgroundColor: "#ffffff",
        		bodyColor: "#46586e"
        	}
        ];

        // command 정의 - cmd (string - browser command, function - 별도 구현)
        var commandList;
        var stDragResizeContent;
        var curScreenY = 0;

        /******************************************************************************
        	Form Event
        ******************************************************************************/
        this.RichTextEditor_onload = function(obj, e)
        {
        	// div 링크 등의 별도 사용여부에 따른 config 설정
        	if (this.name == "RichTextEditor")
        	{
        		this.initialize({}, obj);
        	}
        }

        this.RichTextEditor_onclick = function(obj,  e)
        {
        	this.hideDiv(openedDiv);

        	// WebBrowser에 포커스가 있는 상태이면 form 에 wheel scroll 이 발생해도
        	// 스크롤되지 않는 현상으로 추가함. ( edt_focus 는 크기, 위치가 0 임)
        	if ( nexacro._Browser == "Runtime" )
        	{
        		this.edt_focus.setFocus();
        	}
        }

        this.RichTextEditor_onsize = function(obj, e)
        {
        	var userCallback = initConfig.editor.resizeCallback;
        	if (this.gfnIsFunction(userCallback))
        	{
        		userCallback.call(caller, obj.parent, e);
        	}
        }

        this.RichTextEditor_ontimer = function(obj, e)
        {
        	var id = e.timerid;
        	if (id == 12345)
        	{
        		this.killTimer(id);
        		this.setCommandState(this._commandArg);
        	}
        }

        this.RichTextEditor_onclose = function(obj, e)
        {

        }

        /******************************************************************************
        	Editor 초기화 - 생성, 위치/크기, 리사이즈
        ******************************************************************************/
        this.initialize = function(userConfig, target)
        {
        	this.gfnObjectEach(userConfig, function(prop, val, object) {
        		this.gfnObjectCopyProperties(initConfig[prop], val)
        	}, this);

        	caller = target;

        	var pThis = this;
        	caller.addEventHandler("onclick", function(obj, e) {
        		pThis.hideDiv(openedDiv);
        		// WebBrowser에 포커스가 있는 상태이면 form 에 wheel scroll 이 발생해도
        		// 스크롤되지 않는 현상으로 추가함. ( edt_focus 는 크기, 위치가 0 임)
        		if ( nexacro._Browser == "Runtime" )
        		{
        			pThis.edt_focus.setFocus();
        		}
        	}, this);

        	this.initEditor();
        }

        this.initEditor = function()
        {
        	// command 정의 - cmd (string - browser command, function - 별도 구현)
        	commandList = {
        		"btn_font"			: { cmd: "FontName", showUI : true,		args : this.div_font },			// 글꼴
        		"btn_fontsize"		: { cmd: "FontSize", showUI : true,		args : this.div_fontsize },		// 크기
        		"btn_color"			: { cmd: "ForeColor", showUI : true,	args : this.div_color },		// 폰트색
        		"btn_bkcolor"		: { cmd: "BackColor", showUI : true,	args : this.div_color },		// 폰트 배경색
        		"btn_bold"			: { cmd: "Bold" },					// 굵게
        		"btn_italic"		: { cmd: "Italic" },				// 기울임꼴
        		"btn_underline"		: { cmd: "Underline" },				// 밑줄
        		"btn_strikechar"	: { cmd: "Strikethrough" },			// 취소선

        		"btn_left"			: { cmd: "JustifyLeft" },			// 왼쪽 맞춤
        		"btn_center"		: { cmd: "JustifyCenter" },			// 가운데 맞춤
        		"btn_right"			: { cmd: "JustifyRight" },			// 오른쪽 맞춤
        		"btn_full"			: { cmd: "JustifyFull" },			// 양쪽 맞춤
        		"btn_indentout"		: { cmd: "Outdent" },				// 내어쓰기
        		"btn_indentin"		: { cmd: "Indent" },				// 들여쓰기
        		"btn_numberlist"	: { cmd: "InsertOrderedList" },		// 번호 매기기
        		"btn_marklist"		: { cmd: "InsertUnorderedList" },	// 글머리 기호

        		"btn_layoutTable"	: { cmd: this.pasteHtml, showUI : true,	args: this.div_tableLayout },	// 표 추가
        		"btn_template"		: { cmd: this.pasteHtml, showUI : true,	args: this.div_template },		// 템플릿
        		"btn_blockquote"	: { cmd: this.pasteHtml, showUI : true,	args: this.div_blockquote },	// 인용구
        		"btn_specialchar"	: { cmd: this.pasteHtml, showUI : true,	args: this.div_char },			// 기호 넣기
        		"btn_highlight"		: { cmd: this.highlight, showUI : true,	args: this.div_highlight },		// 코드 하이라이트
        		"btn_link"			: { cmd: this.pasteHtml, showUI : true,	args : this.div_link },			// 웹 링크
        		"btn_linkdel"		: { cmd: "UnLink" },													// 링크 삭제
        		"btn_image"			: { cmd: this.addImage },												// 이미지 추가

        		"btn_merge"			: { cmd: this.executeTableFunc, args: "merge" },				// 병합
        		"btn_resetMerge"	: { cmd: this.executeTableFunc, args: "resetMerge" },			// 분할
        		"btn_insertRowAbove": { cmd: this.executeTableFunc, args: "insertRowAbove" },		// 위로 추가
        		"btn_insertRowBelow": { cmd: this.executeTableFunc, args: "insertRowBelow" },		// 아래로 추가
        		"btn_insertColLeft"	: { cmd: this.executeTableFunc, args: "insertColLeft" },		// 좌측으로 추가
        		"btn_insertColRight": { cmd: this.executeTableFunc, args: "insertColRight" },		// 우측으로 추가
        		"btn_deleteRow"		: { cmd: this.executeTableFunc, args: "deleteRow" },			// 행 삭제
        		"btn_deleteCol"		: { cmd: this.executeTableFunc, args: "deleteCol" },			// 열 삭제

         		"btn_verticaltop"	: { cmd: this.executeTableFunc, args: ["setVerticalAlign", "top"] },			// 상단 정렬
         		"btn_verticalmiddle": { cmd: this.executeTableFunc, args: ["setVerticalAlign", "middle"] },			// 중단 정렬
         		"btn_verticalbottom": { cmd: this.executeTableFunc, args: ["setVerticalAlign", "bottom"] },			// 하단 정렬

        		"btn_tablebdcolor"	: { cmd: this.executeTableFunc, showUI : true, args: [this.div_color, "setBorderColor"]  },					// 선색
        		"btn_tablebdheight"	: { cmd: this.executeTableFunc, showUI : true, args: [this.div_tableBoderHeight, "setBorderHeight"]  },		// 선두께
        		"btn_tablebdrange"	: { cmd: this.executeTableFunc, showUI : true, args: [this.div_tableBoderRange, "setBorderRange"]  },		// 선테두리
        		"btn_tablebgcolor"	: { cmd: this.executeTableFunc, showUI : true, args: [this.div_color, "setBackgroundColor"]  }				// 테이블 배경색
        	};

        	// toolbar 설정
        	if (this.gfnIsEmpty(initConfig.editor.showToolbar))
        	{
        		initConfig.editor.showToolbar = true;
        	}

        	// showEditMode 설정
        	if (this.gfnIsEmpty(initConfig.editor.showEditMode))
        	{
        		initConfig.editor.showEditMode = true;
        	}

        	this.setToolbarButtons();

        	this.updateThumbNailPositionSize();

        	var showToolbar = initConfig.editor.showToolbar,
        		showEditMode = initConfig.editor.showEditMode;

        	if ( showEditMode )
        	{
        		this.div_mode.form.btn_edit.setSelectStatus(true);
        		this.div_mode.form.btn_src.setSelectStatus(false);
        	}

        	this.st_editor.set_visible(true);
        	this.div_toolbar.set_visible(showToolbar);
        	this.div_mode.set_visible(showEditMode);
        	this.txt_htmlEditor.set_visible(showEditMode);

        	var webUrl = initConfig.editor.url;

        	// add browser infomation
        	webUrl += "?Browser=" + nexacro._Browser;
        	webUrl += "&BrowserVersion=" + nexacro._BrowserVersion;
        	webUrl += "&BrowserType=" + nexacro._BrowserType;

        	this.web_editor.set_url(webUrl);
        }

        // 툴바 위치 지정
        this.setToolbarButtons = function()
        {
        	var configBtns = initConfig.editor.toolbarButtons,
        		div_toolbar = this.div_toolbar,
        		startX = 2,
        		startY = 4,
        		curLeft = startX,
        		curTop = startY,
        		isSep = false,
        		isNew = false,
        		name, comp,
        		pThis = this;

        	if (initConfig.editor.showToolbar == false || this.gfnIsEmpty(configBtns) || !this.gfnIsArray(configBtns) || configBtns.length < 1)
        	{
        		initConfig.editor.showToolbar = false;
        		return;
        	}

        	this.gfnArrayForEach(configBtns, function(val, index) {

        		comp = null;
        		isSep = false;
        		isNew = false;

        		if (val == "|")	// separator
        		{
        			name = this.gfnGetUniqueId("st_sp_");

        			comp = new Static();
        			comp.init(name, "absolute", 0, 0, 1, 13);
        			div_toolbar.addChild(name, comp);
        			comp.set_background("#93a5ba");
        			comp.show();

        			isSep = true;
        		}
        		else if (val == "\n" )
        		{
        			curLeft = startX;
        			curTop = curTop + toolbarHeightOffset;
        			isNew = true;
        		}
        		else
        		{
        			if (val == "image")
        			{
        				//pThis.initImage();
        			}

        			name = "btn_" + val;
        		}

        		if ( isNew ) return;

        		if (this.gfnIsEmpty(comp))
        		{
        			comp = div_toolbar.form.components[name];
        		}

        		if (comp)
        		{
        			if ( isSep )
        			{
        				curLeft += 4;
        				addTop = 4;
        			}
        			else
        			{
        				curLeft += 1;
        				addTop = 0;
        			}

        			comp.move(curLeft, curTop+addTop);
        			comp.set_visible(true);

        			if ( name == "btn_link" )
        			{
        				div_toolbar.form.btn_linkdel.move(comp.getOffsetLeft(), comp.getOffsetTop());
        			}

        			curLeft += comp.getOffsetWidth() + (isSep ? 3 : 0);
        		}
        	}, this);
        }

        // 하단 첨부/이미지 위치 조정
        this.updateThumbNailPositionSize = function()
        {
        	var gap = 3;
        	var curTop = 0;
        	var nThumbnailHeight = this.st_thumbnail.getOffsetHeight();
        	var nThumbnaiInfolHeight = this.st_thumbnailInfo.getOffsetHeight();
        	var nDivThumbnaiHeight = this.div_thumbnail.getOffsetHeight();
        	var nDivModeHeight = this.div_mode.getOffsetHeight();

        	if ( this.div_thumbnail.visible )
        	{
        		this.st_editor.set_bottom(nThumbnailHeight + gap);
        		this.txt_htmlEditor.set_bottom(nThumbnailHeight + nDivModeHeight + gap);
        		this.web_editor.set_bottom(nThumbnailHeight + nDivModeHeight + gap);
        		this.div_mode.set_bottom(nThumbnailHeight + gap);

        		this.st_thumbnail.move(0, null, null, nThumbnailHeight, 0, 0);
        		this.st_thumbnailInfo.move(0, null, null, nThumbnaiInfolHeight, 0, nDivThumbnaiHeight);
        		this.div_thumbnail.move(0, null, null, nDivThumbnaiHeight, 0, 0);
        	}

        	this.resetScroll();
        }

        /******************************************************************************
        	WebBrowser Event
        ******************************************************************************/
        this.web_editor_onerror = function(obj, e)
        {
        	alert("초기 화면 로딩 에러 (" + e.url + ")");
        }

        this.web_editor_onloadcompleted = function(obj, e)
        {
        	if ( obj.url != "about:blank" && obj.url == e.url )
        	{
        		obj.__load = true;
        		// editor.html 의 initEditor 함수를 호출하고 완료되면
        		// this.initRichTextEditor 을 호출하도록 지정
        		obj.callMethod("initEditor", "initRichTextEditor");
        	}
        }

        this.web_editor_onusernotify = function(obj, e)
        {
        	if ( obj.__load )
        	{
        		var userdata = e.userdata;
        		if ( obj.url != userdata )
        		{
        			var func = null;
        			var params = userdata.split("|");
        			var len = params.length;
        			if ( len > 0 )
        			{
        				func = this[params[0]];
        			}
        			else
        			{
        				trace("params is empty");
        			}

        			if ( func )
        			{
        				params.splice(0, 1);
        				func.apply(this, params);
        			}
        		}
        	}
        }

        /******************************************************************************
        	화면 컨트롤 함수
        ******************************************************************************/

        // editor.html 영역에서 특정 값을 얻어온다.
        this.getHTMLValue = function(name)
        {
        	this.web_editor.callMethod("getHTMLValue", name);

        	var el = this.web_editor.getProperty("document").callMethod("getElementById", "transfer");
        	var val = el.getProperty("value");

        	el.setProperty("value", "");

        	return val;
        }

        // editor.html 초기화 완료 후 처리
        this.initRichTextEditor = function()
        {
        	var wb = this.web_editor;

        	if (this.gfnArrayContains(initConfig.editor.toolbarButtons, "layoutTable"))
        	{
        		wb.callMethod("addTable");
        	}

        	if (this.gfnArrayContains(initConfig.editor.toolbarButtons, "highlight"))
        	{
        		wb.callMethod("addHighlight");
        	}

        	// nexacro 값 정보를 html 에 세팅
        	wb.callMethod("setNexacroNameValue", "chk_ratio", this.div_editImage.form.chk_ratio.value);

        	var userCallback = initConfig.editor.loadCallback;
        	if (this.gfnIsFunction(userCallback))
        	{
        		userCallback.call(caller, this);
        	}

        	if ( initConfig.editor.useInitFocus )
        	{
        		this.focusEditor();
        	}
        }

        /*
        	[Runtime] html 에서 mousedown/mouseup 이벤트가 발생하면 window.title 을 변경하여
        	nexacro WebBrowser 컴포넌트의 onusernotify 이벤트로 전달받아 처리하는데
        	일반적인 클릭 속도로 테스트하면 mousedown 이벤트가 전달되지 않는 경우가 있다. (VB 도 마찬가지..)
        	따라서 up 발생 시 down 이 실행됬는지 체크하여 실행되지 않았다면 실행하도록 처리한다.
        	==> keydown, keyup 도 마찬가지...
        */
        // editor.html ==> onmousedown
        this.editorMouseDown = function()
        {
        	this._onFireMouseDown = true;

        	this.hideDiv(openedDiv);

        	// IE 예외 처리
        	if ( nexacro._Browser == "IE" || nexacro._Browser == "Runtime" )
        	{
        		if (this.getFocus() !== this.web_editor)
        		{
        			this.web_editor.setFocus();
        			this.web_editor.callMethod("setFocus");
        		}
        	}
        }

        // editor.html ==> onmouseup
        this.editorMouseUp = function(arg)
        {
        	if ( !this._onFireMouseDown )
        	{
        		this.editorMouseDown();
        	}

        	this._onFireMouseDown = false;

        	if ( nexacro._Browser == "Runtime" )
        	{
        		this.killTimer(12345);
        		this._commandArg = arg;
        		this.setTimer(12345, 100);
        	}
        	else
        	{
        		this.setCommandState(arg);
        	}
        }

        // editor.html ==> onkeydown
        this.editorKeyDown = function()
        {
        	this._onFireKeyDown = true;

        	this.hideDiv(openedDiv);
        }

        // editor.html ==> onkeyup
        this.editorKeyUp = function(arg)
        {
        	if ( !this._onFireKeyDown )
        	{
        		this.editorKeyDown();
        	}

        	this._onFireKeyDown = false;

        	if ( nexacro._Browser == "Runtime" )
        	{
        		this.killTimer(12345);
        		this._commandArg = arg;
        		this.setTimer(12345, 100);
        	}
        	else
        	{
        		this.setCommandState(arg);
        	}
        }

        // 현재 에디터 영역의 상태 값을 툴바에 표시
        this.setCommandState = function(arg)
        {
        	if ( initConfig.editor.showToolbar != true) return;

        	var commandObject = JSON.parse(arg);

        	var qryValue = commandObject.FN;
        	if (!this.gfnIsEmpty(qryValue))
        	{
        		var cnt = this.ds_font.getCaseCount("code==\""+qryValue+"\"");

        		if(cnt < 1) this.div_toolbar.form.btn_font.set_text("맑은 고딕");
        		else this.div_toolbar.form.btn_font.set_text(qryValue);
        	}

        	var pt = commandObject.DFS;
        	qryValue = commandObject.FS;
        	if (!this.gfnIsEmpty(qryValue))
        	{
        		pt = this.ds_fontsize.lookup("code", qryValue, "pt");
        	}
        	this.div_toolbar.form.btn_fontsize.set_text(pt);

        	qryValue = commandObject.FC;
        	if (!this.gfnIsEmpty(qryValue))
        	{
        		if (nexacro._Browser == "IE" || nexacro._Browser == "Runtime")
        		{
        			qryValue = this.hslAsDecimaltoRgb(parseInt(qryValue));
        		}
        		else
        		{
        			qryValue = qryValue.match(/\d+/g);
        		}

        		qryValue = this.gfnColorRgbToHex(parseInt(qryValue[0]), parseInt(qryValue[1]), parseInt(qryValue[2]));

        		if (!this.gfnIsEmpty(qryValue))
        		{
        			this.div_toolbar.form.btn_color.set_color(qryValue);
        		}
        	}

        	qryValue = commandObject.BC;

        	if (!this.gfnIsEmpty(qryValue))
        	{
        		if (nexacro._Browser == "IE" || nexacro._Browser == "Runtime" )
        		{
        			qryValue = this.hslAsDecimaltoRgb(parseInt(qryValue));
        		}
        		else
        		{
        			qryValue = qryValue.match(/\d+/g);
        		}

        		if (!this.gfnIsEmpty(qryValue))
        		{
        			qryValue = this.gfnColorRgbToHex(parseInt(qryValue[0]), parseInt(qryValue[1]), parseInt(qryValue[2]));
        		}

        		if (!this.gfnIsEmpty(qryValue))
        		{
        			this.div_toolbar.form.btn_bkcolor.set_color(qryValue);
        		}
        	}

        	qryValue = nexacro._toBoolean(commandObject.B) || false;
        	this.div_toolbar.form.btn_bold.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.I) || false;
        	this.div_toolbar.form.btn_italic.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.U) || false;
        	this.div_toolbar.form.btn_underline.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.S) || false;
        	this.div_toolbar.form.btn_strikechar.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.JL) || false;
        	this.div_toolbar.form.btn_left.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.JC) || false;
        	this.div_toolbar.form.btn_center.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.JR) || false;
        	this.div_toolbar.form.btn_right.setSelectStatus(qryValue);

        	qryValue = nexacro._toBoolean(commandObject.JF) || false;
        	this.div_toolbar.form.btn_full.setSelectStatus(qryValue);

        	var link = this.isLink(commandObject.L);
        	this.div_toolbar.form.btn_link.set_visible(!link);
        	this.div_toolbar.form.btn_linkdel.set_visible(link);

        	// because Runtime event problem
        	if ( nexacro._Browser == "Runtime" )
        	{
        		this.div_toolbar.setFocus();
        	}
        }

        // 이미지 속성 값 지정 (call from editor.html)
        this.setImageInfo = function(width, height, right, bottom, borderWidth, borderStyle, styleFloat, showDiv)
        {
        	width = parseInt(width, 10);
        	height = parseInt(height, 10);
        	borderWidth = parseInt(borderWidth, 10);

        	this.div_editImage.form.edt_width.set_value(width);
        	this.div_editImage.form.edt_height.set_value(height);
        	this.div_editImage.form.spn_borderWidth.set_value(borderWidth);
        	this.div_editImage.form.cmb_borderStyle.set_value(borderStyle);

        	if (styleFloat == "none")
        	{
        		this.div_editImage.form.btn_none.setSelectStatus(true);
        		this.div_editImage.form.btn_left.setSelectStatus(false);
        		this.div_editImage.form.btn_right.setSelectStatus(false);
        	}
        	else if (styleFloat == "left")
        	{
        		this.div_editImage.form.btn_none.setSelectStatus(false);
        		this.div_editImage.form.btn_left.setSelectStatus(true);
        		this.div_editImage.form.btn_right.setSelectStatus(false);
        	}
        	else if (styleFloat == "right")
        	{
        		this.div_editImage.form.btn_none.setSelectStatus(false);
        		this.div_editImage.form.btn_left.setSelectStatus(false);
        		this.div_editImage.form.btn_right.setSelectStatus(true);
        	}

        	if ( showDiv == "true" )
        	{
        		right = parseInt(right, 10);
        		bottom = parseInt(bottom, 10);

        		var webB = this.web_editor.getOffsetBottom();
        		var webR = this.web_editor.getOffsetRight();
        		var divH = this.div_editImage._orgH || this.div_editImage.getOffsetHeight();
        		var divW = this.div_editImage._orgW || this.div_editImage.getOffsetWidth();

        		var left = right;
        		var top = bottom;

        		if (right + divW > webR)
        		{
        			left = webR - divW;
        		}
        		if (bottom + divH > webB)
        		{
        			top = webB - divH;
        		}

        		this.showDiv(this.div_toolbar.form.btn_image, [this.div_editImage, left, top]);
        		this.div_editImage.form.edt_height.setFocus();
        		this.div_editImage.form.edt_width.setFocus();
        	}
        }

        /**
         * 포커스 설정
         */
        this.focusEditor = function()
        {
        	this.web_editor.setFocus();
        	this.web_editor.callMethod("setFocus");
        }

        // 에디터 모드로 전환
        this.div_mode_btn_edit_onclick = function(obj,  e)
        {
        	this.changeMode("EDIT");
        }

        // HTML 모드로 전환
        this.div_mode_btn_src_onclick = function(obj,  e)
        {
        	this.changeMode("SRC");
        }

        // 모드 전환
        this.changeMode = function(mode)
        {
        	var div_toolbar = this.div_toolbar,
        		div_mode = this.div_mode,
        		txt_htmlEditor = this.txt_htmlEditor,
        		web_editor = this.web_editor;

        	if (mode == "EDIT")
        	{
        		if (editMode == "EDIT")
        		{
        			return;
        		}

        		div_mode.form.btn_src.set_enable(true);
        		div_mode.form.btn_edit.toggleSelectStatus();
        		div_mode.form.btn_src.toggleSelectStatus();

        		// 변경된 내용이 존재할 경우만 호출
        		if ( editChangeValue != txt_htmlEditor.value )
        		{
        			web_editor.callMethod("setContent", txt_htmlEditor.value || emptyHtml, false);

        			editChangeValue = emptyHtml;
        		}

        		var t = 0;
        		if (initConfig.editor.showToolbar)
        		{
        			div_toolbar.set_visible(true);
        			t = div_toolbar.getOffsetBottom();
        		}

        		web_editor.move(0, t);

        		// because Runtime event problem
        		if ( nexacro._Browser == "Runtime" )
        		{
        			this.div_toolbar.setFocus();
        		}

        		web_editor.set_visible(true);
        		txt_htmlEditor.set_visible(false);

        		this.focusEditor();

        		editMode = "EDIT";
        	}
        	else if (mode == "SRC")
        	{
        		this.hideDiv(openedDiv);

        		if (editMode == "SRC")
        		{
        			return;
        		}

        		div_toolbar.set_visible(false);
        		div_mode.form.btn_edit.set_enable(true);

        		div_mode.form.btn_edit.toggleSelectStatus();
        		div_mode.form.btn_src.toggleSelectStatus();

        		// because Runtime event problem
        		if ( nexacro._Browser == "Runtime" )
        		{
        			this.div_toolbar.setFocus();
        		}

        		txt_htmlEditor.set_value(this.getContent());
        		txt_htmlEditor.set_top(0);
        		txt_htmlEditor.set_visible(true);
        		web_editor.set_visible(false);
        		txt_htmlEditor.setFocus();
        		editMode = "SRC";

        		editChangeValue = txt_htmlEditor.value;
        	}
        }

        // Runtime 실행 시 에디터 입력 중 toolbar 영역에 마우스가 올라가면
        // WebBrowser 의 onnotify 가 발생하지 않는 현상 때문에 추가함
        this.div_toolbar_onmouseenter = function(obj, e)
        {
        	obj.setFocus();
        }

        // 툴바 기능 관련 Div 포커스 잃을 때
        this.div_onkillfocus = function(obj, e)
        {
        	obj.resize(0, 0);
        	obj.set_visible(false);
        }

        // 로딩 이미지 보이기/숨기기
        this.showLoading = function(show)
        {
        	if ( show )
        	{
        		if ( !this.div_prog.visible )
        		{
        			var l = Math.round((this.web_editor.getOffsetWidth() - this.div_prog.getOffsetWidth())/2);
        			var t = Math.round((this.web_editor.getOffsetHeight() - this.div_prog.getOffsetHeight())/2);

        			this.div_prog.move(l, t);
        			this.div_prog.set_visible(true);
        			this.div_prog.bringToFront();
        		}
        	}
        	else
        	{
        		this.div_prog.set_visible(false);
        		this.div_prog.sendToBack();
        		this.focusEditor();
        	}
        }

        /******************************************************************************
        	툴바 처리 관련 함수
        ******************************************************************************/

        // 툴바 버튼 클릭 공통 함수
        this.toolbarButton_onclick = function(obj,  e)
        {
        	var compName = obj.name,
        		cmdInfo = commandList[compName],
        		cmd = cmdInfo.cmd,
        		showUI = cmdInfo.showUI || false,
        		args = cmdInfo.args

        	if (this.gfnIsEmpty(cmd))
        	{
        		return;
        	}

        	if (showUI)
        	{
        		this.showDiv(obj, args);
        	}
        	else
        	{
        		this.execCommand(obj, args);
        	}
        }

        // 툴바 버튼에 해당하는 기능 실행
        this.execCommand = function(btnComp, value)
        {
        	var cmdInfo = commandList[btnComp.name],
        		cmd = cmdInfo.cmd;

        	var editable = this.getHTMLValue("editor.editable");
        	if ( nexacro._toBoolean(editable) )
        	{
        		if (this.gfnIsString(cmd))
        		{
        			this.web_editor.callMethod("execCommand", cmd, value);
        		}
        		else if (this.gfnIsFunction(cmd))
        		{
        			cmd.call(this, value || null);
        		}
        	}
        }

        // 툴바 관련 팝업 화면 보이기
        this.showDiv = function(xComp, args)
        {
        	var div,
        		divMargin = {l: 5, r: 5, t: 7},
        		maxRPos = this.web_editor.getOffsetRight(),
        		divRPos = 0,
        		elementId,
        		left = 0, top = 0;

        	if (!this.gfnIsEmpty(openedDiv))
        	{
        		this.hideDiv(openedDiv);
        	}

        	if (this.gfnIsEmpty(args))
        	{
        		return;
        	}

        	var compName = xComp.name;

        	div = args;
        	if (this.gfnIsArray(args))
        	{
        		if (this.gfnIsEmpty(args[0]))
        		{
        			return;
        		}

        		div = args[0];
        		if (compName == "btn_image")
        		{
        			if (!this.gfnIsEmpty(args[1]))
        			{
        				left = args[1];
        			}
        			if (!this.gfnIsEmpty(args[2]))
        			{
        				top = args[2];
        			}
        		}
        		else
        		{
        			if (!this.gfnIsEmpty(args[1]))
        			{
        				elementId = args[1];
        				div._elementId = elementId;
        			}

        			left = xComp.getOffsetLeft() + divMargin.l;
        			top = xComp.getOffsetBottom();

        			divRPos = left + (div._orgW || div.getOffsetWidth()) + divMargin.r;

        			if (divRPos > maxRPos)
        			{
        				left = left - (divRPos - maxRPos);
        			}
        		}
        	}
        	else
        	{
        		left = xComp.getOffsetLeft() + divMargin.l;
        		top = xComp.getOffsetBottom();
        		divRPos = left + (div._orgW || div.getOffsetWidth()) + divMargin.r;

        		if (divRPos > maxRPos)
        		{
        			left = left - (divRPos - maxRPos);
        		}
        	}

        	if ( compName == "btn_layoutTable" )
        	{
        		this.setDefaultTableLayout();
        	}
        	else if ( compName == "btn_color" )
        	{
        		var color = this.div_toolbar.form.btn_color.color.toString();
        		if ( this.gfnIsEmpty(color) )
        		{
        			color = "#000000";
        		}
        		div.form.loadColor(color);
        	}
        	else if ( compName == "btn_bkcolor" ||  compName == "btn_tablebgcolor" )
        	{
        		var color = this.div_toolbar.form.btn_bkcolor.color.toString();
        		if ( this.gfnIsEmpty(color) )
        		{
        			color = "#000000";
        		}
        		div.form.loadColor(color);
        	}
        	else if ( compName == "btn_tablebdcolor" )
        	{
        		var color  = this.getHTMLValue("table.border.color");
        		if ( this.gfnIsEmpty(color) )
        		{
        			color = "#000000";
        		}
        		div.form.loadColor(color);
        	}

        	openedDiv = div;
        	div._btnComp = xComp;

        	if ( !div._orgW || !div._orgH )
        	{
        		div._orgW = div.getOffsetWidth();
        		div._orgH = div.getOffsetHeight();
        	}

        	div.move(left, top + divMargin.t, div._orgW, div._orgH);
        	div.set_visible(true);
        	div.moveToPrev(this.web_editor);
        	div.setFocus();
        }

        // 툴바 관련 팝업 화면 숨기기
        this.hideDiv = function(div)
        {
        	if (this.gfnIsEmpty(div))
        	{
        		if (!this.gfnIsEmpty(openedDiv))
        		{
        			if (openedDiv.visible)
        			{
        				div = openedDiv;
        			}
        		}
        		else
        		{
        			return;
        		}
        	}

        	div._btnComp = null;
        	div._elementId = null;

        	if ( div.visible )
        	{
        		div.resize(0, 0);	// because Runtime
        		div.set_visible(false);
        		this.focusEditor();
        		openedDiv = null;
        	}
        }

        // 툴바 - 폰트 처리
        this.div_font_grd_font_oncellclick = function(obj, e)
        {
        	var font = this.ds_font.getColumn(e.row, "code"),
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
        	btnComp.set_text(font);
         	this.execCommand(btnComp, font);

        }

        // 툴바 - 폰트 사이즈 처리
        this.div_fontsize_grd_font_oncellclick = function(obj, e)
        {
        	var fontSize = this.ds_fontsize.getColumn(e.row, "code"),
        		fontPt = this.ds_fontsize.getColumn(e.row, "pt"),
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
         	btnComp.set_text(fontPt + " pt");
        	this.execCommand(btnComp, fontSize);
        }

        // 툴바 - 색상 처리(RichTextEditorColorPicker 에 의해 호출되는 함수)
        this.setColor = function(color)
        {
        	var btnComp = openedDiv._btnComp,
        		elementId = openedDiv._elementId;

        	this.hideDiv(openedDiv);

        	if (!this.gfnIsEmpty(color))
        	{
        		if (!this.gfnIsEmpty(elementId))
        		{
        			this.execCommand(btnComp, [elementId, color]);
        		}
        		else
        		{
        			this.execCommand(btnComp, color);
        		}
        	}
        }

        // 툴바 - 템플릿 처리
        this.pasteTemplate_onclick = function(obj,  e)
        {
        	var html = this.ds_template.getColumn(nexacro.toNumber(obj.name.substring(12)), "html"),
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
        	this.execCommand(btnComp, html);
        }

        // 툴바 - 인용구 처리
        this.blockquote_onclick = function(obj,  e)
        {
        	var html = this.ds_blockquote.getColumn(nexacro.toNumber(obj.name.substring(14)), "html") + brHtml,
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
        	this.execCommand(btnComp, html);
        }

        // 툴바 - 하이라이트 처리
        this.div_highlight_grd_highlight_oncellclick = function(obj, e)
        {
        	var code = this.ds_highlight.getColumn(e.row, "code"),
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
         	this.execCommand(btnComp, code);
        }

        // 툴바 - 특수문자 처리
        this.div_char_grd_char_oncellclick = function(obj, e)
        {
        	var value = this.ds_char.getColumn(e.row, e.cell),
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
        	this.execCommand(btnComp, value);
        }

        // 툴바 - 특수문자 처리
        this.div_char_sta_char_onclick = function(obj,  e)
        {
        	var value = obj.text,
        		btnComp = openedDiv._btnComp;

        	this.hideDiv(openedDiv);
        	this.execCommand(btnComp, value);
        }

        // 툴바 - 특수문자 처리 관련
        this.div_char_grd_char_onmousemove = function(obj, e)
        {
        	if(e.row > -1)
        	{
        		this.div_char.sta_char.set_text(this.ds_char.getColumn(e.row, e.cell));
        	}
        }

        // 툴바 - 표 추가 처리
        this.div_tableLayout_div_selected_grd_tableLayout_oncellclick = function(obj, e)
        {
        	var row = nexacro.toNumber(this.div_tableLayout.form.st_row.text);
        	var col = nexacro.toNumber(this.div_tableLayout.form.st_col.text);

        	if (row > 0 && col > 0)
        	{
        		var html,
        			btnComp = openedDiv._btnComp;

        		html = this.makeTable(row, col);

        		this.hideDiv(openedDiv);

        		this.execCommand(btnComp, html);
        	}
        }

        // 툴바 - 표 추가 (테이블 템플릿 선택)
        this.pasteTableTemplate_onclick = function(obj,  e)
        {
        	var btnIdx = -1;

        	var comps = this.div_tableLayout.components;
        	var btn;
        	for (var i=0; i<6; i++)
        	{
        		btn = comps["btn_template"+i];
        		if ( btn == obj )
        		{
        			if ( btn.getSelectStatus() )
        			{
        				btn.setSelectStatus(false);
        			}
        			else
        			{
        				btnIdx = i;
        				btn.setSelectStatus(true);
        			}
        		}
        		else
        		{
        			btn.setSelectStatus(false);
        		}
        	}

        	if ( btnIdx > -1 )
        	{
        		var style = tableTemplateStyles[btnIdx];

        		initConfig.table._headBorderStyle = style.headBorderStyle;
        		initConfig.table._headBackgroundColor = style.headBackgroundColor;
        		initConfig.table._headColor = style.headColor;
        		initConfig.table._bodyBorderStyle = style.bodyBorderStyle;
        		initConfig.table._bodyBackgroundColor = style.bodyBackgroundColor;
        		initConfig.table._bodyColor = style.bodyColor;
        	}
        }

        // 툴바 - 표 추가 (행/열 선택)
        this.tableLayout_onmousemove = function(obj, e)
        {
        	var cellrect = obj.getCellRect(e.row, e.cell);
        	var x = cellrect.right;
        	var y = cellrect.bottom;

        	this.div_tableLayout.form.div_selected.set_width(x);
          	this.div_tableLayout.form.div_selected.set_height(y);

        	var row = e.row < 0 ? 0 : e.row + 1;
        	var col = e.col < 0 ? 0 : e.col + 1;

         	this.div_tableLayout.form.st_row.set_text(row);
         	this.div_tableLayout.form.st_col.set_text(col);
        }

        // 툴바 - 표 추가 (테이블 생성)
        this.makeTable = function(row, col)
        {
        	var table = [],
        		tableWidth = initConfig.table.width,
        		tdHeight = initConfig.table.tdheight,
        		tdWidth = parseInt(initConfig.table.width / col),
        		style = initConfig.table.style;

        	var headBorderStyle = initConfig.table._headBorderStyle,
        		headBackgroundColor = initConfig.table._headBackgroundColor,
        		headColor = initConfig.table._headColor,
        		bodyBorderStyle = initConfig.table._bodyBorderStyle,
        		bodyBackgroundColor = initConfig.table._bodyBackgroundColor,
        		bodyColor = initConfig.table._bodyColor;

        	var basicHeadBorder = ["border-bottom:", headBorderStyle, ";border-right:", headBorderStyle, ";"].join("");
        	var basicBodyBorder = ["border-bottom:", bodyBorderStyle, ";border-right:", bodyBorderStyle, ";"].join("");

        	table.push("\n<table width=\"" + tableWidth + "\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"");
        	table.push(" style=\""+style+"\">");
        	table.push("<tbody>");

        	for (var i = 0; i < row; i++)
        	{
        		table.push("<tr>");

        		for( var j = 0; j < col; j++ ){
        			var border = [basicHeadBorder];
        			table.push("<td style=\"padding: 3px 4px 2px; width:");
        			table.push(tdWidth);
        			table.push(";");
        			table.push("height:",tdHeight,";");

        			if ( i == 0 ){
        				table.push(basicHeadBorder);
        				table.push("border-top:",headBorderStyle,";");
        			}
        			else
        			{
        				table.push(basicBodyBorder);
        			}

        			if ( j == 0 ){
        				if ( i == 0 ){
        					table.push("border-left:",headBorderStyle,";");
        				}
        				else
        				{
        					table.push("border-left:",bodyBorderStyle,";");
        				}
        			}

        			if ( i == 0 ){
        				table.push("background-color:",headBackgroundColor,";");
        				table.push("color:",headColor,";");
        			}
        			else
        			{
        				table.push("background-color:",bodyBackgroundColor,";");
        				table.push("color:",bodyColor,";");
        			}

        			table.push("\">" + brHtml + "</td>");
        		}

        		table.push("</tr>");
        	}
        	table.push("</tbody>\n</table>\n");
        	table.push(brHtml);

        	this.changeEditTable(true);

        	return table.join("");
        }

        // 툴바 - 표 추가 관련
        this.setDefaultTableLayout = function()
        {
        	var comps = this.div_tableLayout.form.components;
        	var btn;
        	for (var i=0; i<6; i++)
        	{
        		btn = comps["btn_template"+i];
        		btn.setSelectStatus(false);
        	}

        	initConfig.table._headBorderStyle = initConfig.table.headBorderStyle;
        	initConfig.table._headBackgroundColor = initConfig.table.headBackgroundColor;
        	initConfig.table._headColor = initConfig.table.headColor;
        	initConfig.table._bodyBorderStyle = initConfig.table.bodyBorderStyle;
        	initConfig.table._bodyBackgroundColor = initConfig.table.bodyBackgroundColor;
        	initConfig.table._bodyColor = initConfig.table.bodyColor;
        }

        // 툴바 - 표 추가 관련
        this.div_tableLayout_onsetfocus = function(obj, e)
        {
        	this.ds_tableLayout.set_rowposition(-1);
        }

        // 툴바 - 표 추가 (취소)
        this.div_tableLayout_btn_close_onclick = function(obj,  e)
        {
        	this.hideDiv(openedDiv)
        }

        // 툴바 - 링크 관련 (링크 여부)
        this.isLink = function(val)
        {
        	if ( this.gfnIsEmpty(val) ) return false;

        	var regExp = /^(http|https|ftp|mailto):(\/\/)?(([-가-힣]|\w)+(?:[\/\.:@]([-가-힣]|\w)+)+)\/?(.*)?\s*$/i;

        	return regExp.test(val);
        }

        // 툴바 - 링크 적용
        this.div_link_btn_apply_onclick = function(obj,  e)
        {
        	var link = this.div_link.edt_link.value,
        		btnComp = openedDiv._btnComp;

        	link = link.trim();
        	if (this.gfnIsEmpty(link) || !this.isLink(link))
        	{
        		alert("주소를 정확히 입력하세요.");
        		return;
        	}

        	var html = '<a href="';
        	html += link;
        	html += '" target="_blank">';
        	html += this.getHTMLValue("editor.selectedContents");
        	html += '</a>';

        	this.hideDiv(openedDiv);
        	this.execCommand(btnComp, html);
        	this.div_link.edt_link.set_value("http://");
        }

        // 툴바 - 링크 적용
        this.div_link_edt_link_onkeydown = function(obj, e)
        {
        	if (e.keycode == 13)
        	{
        		this.div_link_btn_apply_onclick();
        	}
        }

        // 툴바 - 링크 취소
        this.div_link_btn_close_onclick = function(obj,  e)
        {
        	this.hideDiv(openedDiv);
        }

        // 툴바 - 선택한 영역에 HTML 컨텐츠 삽입
        this.pasteHtml = function(html)
        {
        	this.web_editor.callMethod("pasteHtmlAtCaret", html);
        }

        // 툴바 - 이미지 추가
        this.addImage = function()
        {
        	this.fileDlg.open('Select Image', FileDialog.LOAD);
        }

        // 툴바 이미지 속성 - Width
        this.div_editImage_edt_width_onchanged = function(obj, e)
        {
        	var value = e.postvalue;
        	if ( this.gfnIsEmpty(value) )
        	{
        		value = "0";
        	}
        	value = value + 'px';
        	this.web_editor.callMethod("changeImageStyle", "width", value);
        }

        // 툴바 이미지 속성 - Height
        this.div_editImage_edt_height_onchanged = function(obj, e)
        {
        	var value = e.postvalue;
        	if ( this.gfnIsEmpty(value) )
        	{
        		value = "0";
        	}
        	value = value + 'px';

        	this.web_editor.callMethod("changeImageStyle", "height", value);
        }

        // 툴바 이미지 속성 - Reset
        this.div_editImage_btn_reset_onclick = function(obj,  e)
        {
        	var size = this.getHTMLValue("image.getSetSize");
        	var sz = size.split(",");

        	this.div_editImage.form.edt_width.set_value(parseInt(sz[0], 10));
        	this.div_editImage.form.edt_height.set_value(parseInt(sz[1], 10));
        }

        // 툴바 이미지 속성 - Keep aspect ratio
        this.div_editImage_chk_ratio_onchanged = function(obj, e)
        {
        	this.web_editor.callMethod("setNexacroNameValue", "chk_ratio", obj.value);
        }

        // 툴바 이미지 속성 - Stroke
        this.div_editImage_spn_borderWidth_onspin = function(obj,e)
        {
        	var value = e.postvalue;
        	if ( this.gfnIsEmpty(value) )
        	{
        		value = "0";
        	}
        	value = value + 'px';
        	this.web_editor.callMethod("changeImageStyle", "border-width", value);
        }

        // 툴바 이미지 속성 - Line Type
        this.div_editImage_cmb_borderStyle_onitemchanged = function(obj, e)
        {
        	var value = obj.value;
        	if ( this.gfnIsEmpty(value) )
        	{
        		value = "none";
        	}

        	this.web_editor.callMethod("changeImageStyle", "border-style", value);
        }

        // 툴바 이미지 속성 - Align
        this.div_editImage_btn_align_onclick = function(obj,  e)
        {
        	var value = obj.id.substring(4);
        	this.web_editor.callMethod("changeImageStyle", "cssFloat", value);
        }

        // 툴바 - 하이라이트
        this.highlight = function(code)
        {
        	this.web_editor.callMethod("highlight", code);
        }

        // 툴바 - 테이블 속성 영역 보이기/숨기기 처리
        this.div_toolbar_btn_editTable_onclick = function(obj,  e)
        {
        	this.changeEditTable();
        }

        // 툴바 - 테이블 속성 영역 보이기/숨기기
        this.changeEditTable = function(isexpanded)
        {
        	var height, height2,
        		div_toolbar = this.div_toolbar,
        		btn_editTable = div_toolbar.form.btn_editTable,
        		txt_htmlEditor = this.txt_htmlEditor,
        		web_editor = this.web_editor,
        		isexpanded = isexpanded || false;

        	if (btn_editTable.cssclass == "Editor_btn_dn")
        	{
        		height = div_toolbar.getOffsetHeight() + toolbarHeightOffset;
        		btn_editTable.set_cssclass("Editor_btn_up");

        		height2 = web_editor.getOffsetHeight() - toolbarHeightOffset;
        	}
        	else if (btn_editTable.cssclass == "Editor_btn_up")
        	{
        		if (isexpanded)
        		{
        			return;
        		}
        		height = div_toolbar.getOffsetHeight() - toolbarHeightOffset;
        		btn_editTable.set_cssclass("Editor_btn_dn");

        		height2 = web_editor.getOffsetHeight() + toolbarHeightOffset;
        	}

        	div_toolbar.set_height(height);
        	btn_editTable.set_height(height);

        	var t = div_toolbar.getOffsetBottom();

        	web_editor.set_top(t);
        	//web_editor.set_height(height2);

        	txt_htmlEditor.set_top(t);
        	//txt_htmlEditor.set_height(height2);
        }


        // 툴바 - 표 선두께 적용
        this.div_tableBoderHeight_grd_tableBoderHeight_oncellclick = function(obj, e)
        {
        	var value = this.ds_tableBoderHeight.getColumn(e.row, "code"),
        		btnComp = openedDiv._btnComp,
        		elementId = openedDiv._elementId;

        	this.hideDiv(openedDiv);

        	this.execCommand(btnComp, [elementId, value]);
        }

        // 툴바 - 표 선유형 적용
        this.div_tableBoderRange_grd_tableBoderRange_oncellclick = function(obj, e)
        {
        	var value = this.ds_tableBoderRange.getColumn(e.row, "code") + "," + this.div_tableBoderRange.form.rdo_type.value,
        		btnComp = openedDiv._btnComp,
        		elementId = openedDiv._elementId;

        	this.hideDiv(openedDiv);

        	this.execCommand(btnComp, [elementId, value]);
        }

        // 툴바 - 테이블 속성 처리
        this.executeTableFunc = function(args)
        {
        	var funcName, value;

        	if (this.gfnIsArray(args))
        	{
        		if (this.gfnIsEmpty(args[0]))
        		{
        			return;
        		}

        		funcName = args[0];
        		if (!this.gfnIsEmpty(args[1]))
        		{
        			value = args[1];
        		}
        	}
        	else
        	{
        		funcName = args;
        	}

        	this.web_editor.callMethod("executeTableFunc", funcName, value);
        }

        /******************************************************************************
        	이미지 업로드 관련 함수
        ******************************************************************************/
        this.imageFileComp = null;

        // 이미지업로드 - 초기화
        this.initImage = function()
        {
        	this.fileDlg.set_filter("Images(*.jpg;*.jpeg;*.gif;*.png;*.bmp)|*.jpg;*.jpeg;*.gif;*.png;*.bmp");
        	this.fileDlg.open('Select Image', FileDialog.LOAD);
        }

        // 이미지업로드 - 아이템 변경 시
        this.fileDlg_onclose = function(obj,e)
        {
        	if(this.gfnIsEmpty(e.virtualfiles))
        	{
        		alert("선택한 파일이 없습니다.");
        		return;
        	}

        	var ds = this.ds_images;
         	var file = e.virtualfiles[0];
        	var fileId   = file.id;
        	var fileName = file.filename;
        	var fileSize = e.filesize;

        	if( ds.findRow("filename", fileName) > -1 ) {
        		alert("중복된 파일명이 존재합니다.  " + fileName);
        		return;
        	}

        	var expr = "this.getRowType(rowidx)==Dataset.ROWTYPE_NORMAL || this.getRowType(rowidx)==Dataset.ROWTYPE_UPDATE";
        	var curTotalFileSize = ds.getCaseSum(expr, "filesize");

        	var cond;
        	if ( !this.gfnIsEmpty(fileSize) && fileSize > 0 )
        	{
        		cond = {"name" : fileName, "length" : ds.rowcount, "size" : fileSize, "totalSize" : (curTotalFileSize + fileSize)};
        	}
        	else
        	{
        		cond = {"name" : fileName, "length" : ds.rowcount};
        	}

        	var valid = this.validateFile(cond);

        	// 0 : 파일 유형 에러
        	// -1 : 최대 파일첨부가능 건수 또는 size 에러
        	if (valid <= 0)
        	{
        		return;
        	}

        	this.showLoading(true);

        	this.fileUpTrans.addFile(fileName, file);

         	var row = ds.addRow();
         	ds.setColumn(row, "filename", fileName);
         	ds.setColumn(row, "filesize", fileSize);

        	var url = initConfig.image.host + initConfig.image.uploadUrl;

        	url += "&maxSize=" + this.sizeToByte(initConfig.image.maxSize);
        	url += "&maxTotalSize=" + (this.sizeToByte(initConfig.image.maxTotalSize) - curTotalFileSize);

        	this.fileUpTrans.upload(url);
        }

        this.fileUpTrans_onsuccess = function(obj,e)
        {
        	this.showLoading(false);

        	var errorcode = e.code;
        	var errormsg = e.message;

        	if ( errorcode < 0 )
        	{
        		alert("업로드 처리중에 에러가 발생했습니다.\n[" + errorcode + "," + errormsg + "]");
        		return;
        	}
        	else if ( errorcode == 1 )
        	{
        		if ( errormsg == "FileSizeLimitExceededException" )
        		{
        			alert("파일 크기가 " + initConfig.image.maxSize + " 이상인 파일은 업로드가 허용되지 않습니다.");
        		}
        		else if ( errormsg == "SizeLimitExceeded" )
        		{
        			alert("전체 파일 크기가 " + initConfig.image.maxTotalSize + " 를 초과할 수 없습니다.");
        		}

        		this.ds_images.deleteRow(this.ds_images.rowcount-1);
        		return;
        	}

        	var ds = null;

        	// Only Runtime
        	if( e.datasets )
        	{
        		ds = e.datasets[0];
        	}
        	else
        	{
        		ds = this.ds_outfiles;
        	}

        	if ( ds )
        	{
        		var fileName = ds.getColumn(0, "filename");
        		var saveFileName = ds.getColumn(0, "savefilename");
        		var fileSize = ds.getColumn(0, "filesize");

        		var row = this.ds_images.findRow("filename", fileName);
        		if ( row > -1 )
        		{
        			this.ds_images.setColumn(row, "filesize", fileSize);
        			this.ds_images.setColumn(row, "savefilename", saveFileName);
        		}

        		var imgDiv = this.addImageThumbnail(fileName, saveFileName, fileSize);

        		var id = imgDiv.name;
        		var src = initConfig.image.host + initConfig.image.src + saveFileName;
        		this.web_editor.callMethod("addImage", id, src);

        		this.updateThumbNailPositionSize();

        		this.setImageThumbnailInfo();
        	}

        	var userCallback = initConfig.image.loadCallback;
        	if (this.gfnIsFunction(userCallback))
        	{
        		userCallback.call(caller, "upload", errorcode, errormsg, ds);
        	}
        }

        /******************************************************************************
        	이미지 썸네일 관련 함수
        ******************************************************************************/

        // 썸네일 추가
        this.addImageThumbnail = function(fileName, saveFileName, fileSize)
        {
        	var thumbnailLength = imageList.length,
        		imgDiv, imgViewer, selBtn, addBtn, rmBtn,
        		imgSrc;
        	var sDivid, sImgId, sSelBtnId, sAddBtnId, sRmBtnId;

            imgSrc = "URL('"+initConfig.image.host + initConfig.image.src + saveFileName +"')";

        	this.st_thumbnail.set_visible(true);
        	this.st_thumbnailInfo.set_visible(true);
        	this.div_thumbnail.set_visible(true);

        	if ( thumbnailLength > 0 )
        	{
        		if (thumbnailLength%imgMaxCount == 0)
        		{
        			imgRect.left = imgOffset.x;
        			imgRect.top = imgRect.top + imgRect.height + imgOffset.y;
        		}
        		else
        		{
        			imgRect.left = imgRect.left + imgRect.width + imgOffset.x;
        		}
        	}

        	// 이미지 onmouseenter와 대표이미지 버튼 onclick 우회 처리
        	sDivid = this.gfnGetUniqueId("div_");
        	imgDiv = new Div(sDivid, imgRect.left, imgRect.top, imgRect.width, imgRect.height, null, null);
        	this.div_thumbnail.addChild(imgDiv.name, imgDiv);
        	imgDiv.addEventHandler("onmouseenter", this.selectItemOnMouseEnterHandler, this);
        	imgDiv.addEventHandler("onmouseleave", this.selectItemOnMouseLeaveHandler, this);
        	imgDiv.show();
        	imgDiv._src = initConfig.image.host + initConfig.image.src + saveFileName;
        	imageDivList.push(imgDiv);

        	// 이미지 생성
        	sImgId = this.gfnGetUniqueId("imgViewer_");
        	imgViewer = new ImageViewer(sImgId, 0, 0, imgRect.width, imgRect.height, null, null);
        	imgDiv.addChild(imgViewer.name, imgViewer);
        	imgViewer.set_stretch("fit");
        	imgViewer.set_image(imgSrc);
        	imgViewer.show();
        	imgViewer.set_cssclass("WF_imgvwr_thumb");
        	imageList.push(imgViewer);

        	// 대표이미지 선택 버튼 생성
        	sSelBtnId = this.gfnGetUniqueId("btnSel_");
        	selBtn = new Button(sSelBtnId, selBtnRect.x, selBtnRect.y, selBtnRect.width, selBtnRect.height, null, null);
        	imgDiv.addChild(selBtn.name, selBtn);
        	selBtn.set_visible(false);
        	selBtn.set_tooltiptext("대표이미지 선택");
        	selBtn.addEventHandler("onclick", this.selectItemOnClickHandler, this);
        	selBtn.show();
        	selBtn.set_cssclass("WF_btn_thumbPhoto");
        	selBtnList.push(selBtn);


        	// 본문에 추가하기 버튼 생성
        	sAddBtnId = this.gfnGetUniqueId("btnAdd_");
        	addBtn = new Button(sAddBtnId, addBtnRect.x, addBtnRect.y, addBtnRect.width, addBtnRect.height, null, null);
        	imgDiv.addChild(addBtn.name, addBtn);
        	addBtn.set_visible(false);
        	addBtn.set_tooltiptext("본문에 추가");
        	addBtn.addEventHandler("onclick", this.addItemOnClickHandler, this);
        	addBtn.show();
        	addBtn.set_cssclass("WF_btn_thumbUse");
        	addBtnList.push(addBtn);


        	// 삭제 버튼 생성
        	sRmBtn = this.gfnGetUniqueId("btnRm_");
        	rmBtn = new Button(sRmBtn, rmBtnRect.x, rmBtnRect.y, rmBtnRect.width, rmBtnRect.height, null, null);
        	imgDiv.addChild(rmBtn.name, rmBtn);
        	rmBtn.set_visible(false);
        	rmBtn.set_tooltiptext("이미지 삭제");
        	rmBtn.addEventHandler("onclick", this.removeItemOnClickHandler, this);
        	rmBtn.show();
        	rmBtn.set_cssclass("WF_btn_thumbCls");
        	rmBtnList.push(rmBtn);
        	imgDiv.form.resetScroll();
        	this.div_thumbnail.form.resetScroll();

        	return imgDiv;
        }

        // 이미지 등록 정보 표시
        this.setImageThumbnailInfo = function()
        {
        	var cnt = this.ds_images.rowcount;
        	var sum = this.ds_images.getSum("filesize");
        	var maxSize = initConfig.image.maxSize;

        	var stText = cnt + "/" + initConfig.image.maxCount + " (" + this.bytesToSize(sum) + "/" + initConfig.image.maxTotalSize + ") uploaded.";

        	if ( !this.gfnIsEmpty(maxSize) )
        	{
        		stText += " Each file size can not exceed " + maxSize;
        	}

        	this.st_thumbnailInfo.set_text(stText);
        }

        // 썸네일 이미지 이동
        this.moveThumnailImage = function(index)
        {
        	var i = 0, name,
        		imageLength = imageDivList.length;

        	if (imageLength> 0)
        	{
        		for (i = index; i < imageLength; i++)
        		{
        			imgDiv = imageDivList[i];

        			if (i > 0)
        			{
        				if (i%imgMaxCount == 0)
        				{
        					imgRect.left = imgOffset.x;
        					imgRect.top = imgRect.top + imgRect.height + imgOffset.y;
        				}
        				else
        				{
        					imgRect.left = imgRect.left + imgRect.width + imgOffset.x;
        				}
        			}
        			imgDiv.move(imgRect.left, imgRect.top, imgRect.width, imgRect.height);
        		}

        		this.div_thumbnail.form.resetScroll();
        	}
        	else
        	{
        		this.div_thumbnail.set_visible(false);
        		this.st_thumbnailInfo.set_visible(false);
        		this.st_thumbnail.set_visible(false);

        		this.updateThumbNailPositionSize();
        	}
        }

        // 대표이미지 - 마우스
        this.selectItemOnMouseEnterHandler = function(obj,  e)
        {
        	var imgIndex = this.gfnArrayIndexOf(imageDivList, obj),
        		selBtn = selBtnList[imgIndex],
        		addBtn = addBtnList[imgIndex],
        		rmBtn = rmBtnList[imgIndex];

        	selBtn.set_visible(true);
        	addBtn.set_visible(true);
        	rmBtn.set_visible(true);
        }

        // 대표이미지 - 마우스
        this.selectItemOnMouseLeaveHandler = function(obj,  e)
        {
        	var imgIndex = this.gfnArrayIndexOf(imageDivList, obj),
        		imgViewer = imageList[imgIndex],
        		selBtn = selBtnList[imgIndex],
        		addBtn = addBtnList[imgIndex],
        		rmBtn = rmBtnList[imgIndex];

        	if (selectedImage && (imgViewer === selectedImage))
        	{
        		return;
        	}

        	selBtn.set_visible(false);
        	addBtn.set_visible(false);
        	rmBtn.set_visible(false);
        }

        // 대표이미지 선택 버튼 클릭
        this.selectItemOnClickHandler = function(obj,  e)
        {
        	var btnIndex = this.gfnArrayIndexOf(selBtnList, obj);

        	this.setSelectedImage(btnIndex);
        }

        this.setSelectedImage = function(setIndex)
        {
        	this.gfnArrayForEach(imageList, function(name, index) {
        		var tempImage = imageList[index],
        			selBtn = selBtnList[index],
        			rmBtn = rmBtnList[index];

        		if (index === setIndex)
        		{
        			selectedImage = tempImage;
        			selBtn.set_visible(true);
        			selectedImage.set_cssclass("WF_imgvwr_thumb_S");
        			selBtn.setSelectStatus(true);
        			return false;
        		}

        		if (selectedImage)
        		{
        			tempImage.set_cssclass("WF_imgvwr_thumb");
        		}
        		selBtn.setSelectStatus(false);
        		selBtn.set_visible(false);
        		rmBtn.set_visible(false);
        	});
        }

        // 본문에 이미지 추가
        this.addItemOnClickHandler = function(obj, e)
        {
        	var btnIndex = this.gfnArrayIndexOf(addBtnList, obj);
        	var src = imageDivList[btnIndex]._src;

        	this.web_editor.callMethod("addImage", obj.name, src);
        }

        // 썸네일 이미지 삭제 버튼 클릭
        this.removeItemOnClickHandler = function(obj,  e)
        {
        	this.hideDiv(openedDiv);

        	var index = this.gfnArrayIndexOf(rmBtnList, obj);

        	this.ds_deleteImage.set_enableevent(false);
        	this.ds_deleteImage.clearData();
        	this.ds_deleteImage.addRow();
        	this.ds_deleteImage.setColumn(0, "filename", this.ds_images.getColumn(index, "filename"));
        	this.ds_deleteImage.setColumn(0, "filesize", this.ds_images.getColumn(index, "filesize"));
        	this.ds_deleteImage.setColumn(0, "savefilename", this.ds_images.getColumn(index, "savefilename"));
        	this.ds_deleteImage.setColumn(0, "index", index);
        	this.ds_deleteImage.set_enableevent(true);

        	var url = initConfig.image.host + initConfig.image.deleteUrl;


        	nexacro.getEnvironment().set_usewaitcursor(false);
        	this.showLoading(true);

        	this.transaction("deleteImage", url, "input=ds_deleteImage", "", "", "removeImageCallback");
        }

        // 썸네일 이미지 삭제 transaction callback
        this.removeImageCallback = function(id, errorcode, errormsg)
        {
        	this.showLoading(false);
        	nexacro.getEnvironment().set_usewaitcursor(true);

        	// 삭제 성공
        	if (errorcode == 0)
        	{
        		var index = this.ds_deleteImage.getColumn(0, "index");
        		this.ds_images.deleteRow(index);
        		this.removeImageThumbnail(index);
        		this.setImageThumbnailInfo();
        	}
        	else
        	{
        		alert("삭제 처리중에 에러가 발생했습니다.\n[" + errormsg + "]");
        	}

        	var userCallback = initConfig.image.removeCallback;
        	if ( this.gfnIsFunction(userCallback) )
        	{
        		userCallback.call(caller, errorcode, errormsg, this.ds_deleteImage);
        	}
        }

        // 썸네일 이미지 삭제
        this.removeImageThumbnail = function(index)
        {
        	var removeImgRect,
        		imgDiv = imageDivList[index],
        		imgViewer = imageList[index],
        		selBtn = selBtnList[index],
        		rmBtn = rmBtnList[index],
        		removedComp,
        		rectIndex = index > 0 ? index-1 : 0;

        	// contents 이미지 삭제
        	this.web_editor.callMethod("removeImage", imgDiv._src);

        	// 대표 이미지 삭제
        	if (!this.gfnIsEmpty(selectedImage))
        	{
        		if ( selectedImage == imgViewer )
        		{
        			selectedImage = undefined;
        		}
        	}

        	removeImgRect = imageDivList[rectIndex];
        	imgRect.left = removeImgRect.getOffsetLeft();
        	imgRect.top = removeImgRect.getOffsetTop();

        	// 이미지뷰어 삭제
        	removedComp = imgDiv.removeChild(imgViewer.name);
        	this.gfnArrayRemoveAt(imageList, index);
        	removedComp.destroy();

        	// 대표이미지 선택 버튼 삭제
        	removedComp = imgDiv.removeChild(selBtn.name);
        	this.gfnArrayRemoveAt(selBtnList, index);
        	removedComp.destroy();

        	// 이미지 삭제 버튼 삭제
        	removedComp = imgDiv.removeChild(rmBtn.name);
        	this.gfnArrayRemoveAt(rmBtnList, index);
        	removedComp.destroy();

        	// 이미지 Div 삭제
        	removedComp = this.div_thumbnail.removeChild(imgDiv.name);
        	this.gfnArrayRemoveAt(imageDivList, index);
        	removedComp.destroy();

        	this.moveThumnailImage(index);
        }

        /******************************************************************************
        	유틸 함수
        ******************************************************************************/

        // color 변환
        this.hslAsDecimaltoRgb = function(val)
        {
            if (!this.gfnIsNumber(val))
            {
                return val;
            }

        	var rgb = [];
        	rgb.push((val & 0xFF));
        	rgb.push(((val & 0xFF00) >> 8));
        	rgb.push(((val & 0xFF0000) >> 16 ));

            return rgb;
        }

        // 주어진 size 를 byte 로 반환
        this.bytesToSize = function(filesize, type)
        {
        	if (this.gfnIsEmpty(filesize)) return;

            var size = filesize  + " bytes",
                multiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                idx = 0,
                approx = 0;

            for (idx = 0, approx = filesize / 1024; approx > 1; approx /= 1024, idx++)
            {
                if (type == 1)
                {
                    size = approx.toFixed(2) + multiples[idx] + " (" + filesize + " bytes)";
                }
                else if (type == 2)
                {
                    size = approx.toFixed(2);
                }
                else
                {
                    size = approx.toFixed(2) + multiples[idx];
                }
            }

            return size;
        }

        // 주어진 byte 를 size 로 반환
        this.sizeToByte = function(fileSize)
        {
        	var unit = fileSize.match(/[^\d]+/g),
        		size = fileSize.match(/\d+/);

        	unit = unit ? unit[0].toLowerCase() : "";
        	size = size ? size[0] : fileSize;

        	if (unit == "mb")
        	{
        		return size * 1024 * 1024;
        	}
        	else if (unit == "gb")
        	{
        		return size * 1024 * 1024 * 1024;
        	}
        	else if (unit == "tb")
        	{
        		return size * 1024 * 1024 * 1024 * 1024;
        	}
        	else if (unit == "")
        	{
        		return size;
        	}
        	else
        	{
        		return fileSize;
        	}
        }

        // 파일/이미지 추가시 유효성 체크
        this.validateFile = function(cond)
        {
        	var rtn = 1;
        	this.gfnObjectEach(cond, function(prop, val, object) {
        		var result = "";
        		if (prop == "name")
        		{
        			var fileExt = val.slice(val.lastIndexOf(".")+1).toLowerCase();
        			if(!this.gfnArrayContains(initConfig.image.allowTypes, fileExt))
        			{
        				alert("'" + fileExt + "' 유형의 파일은 업로드가 불가능합니다. [" + val + "]");
        				rtn = 0;
        				return false;
        			}
        			/* fileAPI file.type, mime type  - http://www.iana.org/assignments/media-types
        			console.log("file.type:" + file.type);
        			if(!file.type.match("image.*"))
        			{
        				return 0;
        			}
        			*/
        		}
        		else if (prop == "length")
        		{
        			if (val >= initConfig.image.maxCount)
        			{
        				alert(initConfig.image.maxCount + "건 이상의 파일 업로드는 허용되지 않습니다.");
        				rtn = -1;
        				return false;
        			}
        		}
        		else if (prop == "size")
        		{
        			if (!isNaN(val) && (val >= this.sizeToByte(initConfig.image.maxSize)))
        			{
        				alert("파일 크기가 " + initConfig.image.maxSize + " 이상인 파일은 업로드가 허용되지 않습니다.");
        				rtn = 0;
        				return false;
        			}
        		}
        		else if (prop == "totalSize")
        		{
        			if (!isNaN(val) && (val >= this.sizeToByte(initConfig.image.maxTotalSize)))
        			{
        				alert("전체 파일 크기가 " + initConfig.image.maxTotalSize + " 를 초과할 수 없습니다.");
        				rtn = -1;
        				return false;
        			}
        		}
        	}, this);

        	return rtn;
        }

        /******************************************************************************
        	외부 노출 함수
        ******************************************************************************/

        // 설정값 지정
        this.setConfig = function(props, srcobject)
        {
        	this.gfnObjectEach(props, function(prop, srcobject, object) {
        		var tarobject = initConfig[prop];
        		if (tarobject && srcobject)
        		{
        			var p, value;
        			for (p in srcobject)
        			{
        				if (srcobject.hasOwnProperty(p))
        				{
        					value = srcobject[p];
        					tarobject[p] = value;
        				}

        				if (prop == "image")
        				{
        					// host?
        					if (p == "uploadUrl")
        					{
        						this.imageFileComp.set_uploadurl(initConfig.image.host + initConfig.image.uploadUrl);
        					}
        				}
        			}
        		}

        	}, this);
        }

        // 설정값 반환
        this.getConfig = function(pathName)
        {
        	var comps = [],
        		i, len,
        		comp, p = initConfig;

        	comps = pathName.split(".");

        	for (i = 0, len = comps.length; i < len ; i++ )
        	{
        		comp = comps[i];
        		p = p[comp];
        		if (!p) break;
        	}

        	return p;
        }

        // 에디트 모드 반환
        this.getMode = function()
        {
        	return editMode;
        }

        // 컨텐츠 반환
        this.getContent = function()
        {
        	return this.getHTMLValue("editor.content");
        }

        // 컨텐츠 지정
        this.setContent = function(content)
        {
        	this.web_editor.callMethod("setContent", content || emptyHtml, true);
        }

        // 텍스트 컨텐츠 반환
        this.getTextContent = function()
        {
        	return this.getHTMLValue("editor.textContent");
        }

        // 소스(HTML) 반환 - getContent 와 차이는 ??
        this.getSrc = function()
        {
        	return this.txt_htmlEditor.value;
        }

        // 기 등록된 첨부파일 정보를 에디터에 보여준다.
        this.setAttachImages = function(attachInfo)
        {
        	var row, fileName, saveFileName, fileSize;
        	var ds = this.ds_images;

        	if ( !this.gfnIsEmpty(attachInfo) )
        	{
        		var selected;
        		ds.set_enableevent(false);
        		ds.clearData();
        		for (var i=0, len=attachInfo.length; i<len; i++)
        		{
        			fileName = attachInfo[i].fileName;
        			saveFileName = attachInfo[i].saveFileName;
        			fileSize = attachInfo[i].fileSize;
        			selected = attachInfo[i].selected;

        			row = ds.addRow();
        			ds.setColumn(row, "filename", fileName);
        			ds.setColumn(row, "savefilename", saveFileName);

        			if ( !this.gfnIsEmpty(fileSize) )
        			{
        				ds.setColumn(row, "filesize", fileSize);
        			}

        			this.addImageThumbnail(fileName, saveFileName, fileSize);

        			if ( selected )
        			{
        				this.setSelectedImage(i);
        			}
        		}
        		ds.applyChange();
        		ds.set_enableevent(true);

        		this.setImageThumbnailInfo();
        	}

        	this.updateThumbNailPositionSize();
        }

        // 이미지 등록 정보 반환
        this.getAttachImages = function()
        {
        	var attachImages = [];
        	var ds = this.ds_images;

        	this.gfnArrayForEach(imageList, function(object, index) {
        		var info = {
        				"fileName" : ds.getColumn(index, "filename"),
        				"fileSize" : ds.getColumn(index, "filesize"),
        				"saveFileName" : ds.getColumn(index, "savefilename")
        				};

        		// 대표 이미지
        		if ( object == selectedImage )
        		{
        			info.selected = true;
        		}
        		else
        		{
        			info.selected = false;
        		}

        		attachImages.push(info);
        	});

        	return attachImages;
        }

        /**
        * object 속성값들을 주어진 함수로 처리한다.<br>
        * 주어진 함수에서 return false를 하면 반복이 멈춘다.
        * @param {object} object 대상 object.
        * @param {function} func callback 함수.
        * @param {string} func.prop object property name.
        * @param {object} func.val object property value.
        * @param {object} func.object object 그 자체.
        * @param {object=} scope callback 함수에 대한 수행 scope.
        * @example
        * var datas = {code: "001", userId: "", name: "pete"};
        * this.gfnObjectEach(datas, function(prop, val, object) {
        * 	var result = "";
        * 	if ( !val )
        * 	{
        * 		result = prop + " must have not a non-empty value!"
        * 		st_result03.text += result;
        * 		trace(result);	// output : userId must have not a non-empty value!
        * 		return false;
        * 	}
        * 	result = prop + ":" + val;
        * 	st_result03.text += result + "  ";
        * 	trace(result);	// output : code:001
        * }, this);
        */
        this.gfnObjectEach = function(object, func, scope)
        {
        	var p,
        		scope = scope || object;
        	for (p in object)
        	{
        		if (object.hasOwnProperty(p))
        		{
        			if (func.call(scope, p, object[p], object) === false)
        			{
        				return;
        			}
        		}
        	}
        }

        /**
        * object에 argument로 주어진 object의 모든 속성값을 복사한다.<br>
        * object, function, date, array Type은 reference가 복사된다.
        * @param {object} tarobject target 객체.
        * @param {object} srcobject source 객체.
        * @example
        * var target = {};
        * this.gfnObjectCopyProperties(target, {a: 1, b: "2", c: {"A": "3", "B": 4}});
        * for(var p in target)
        * {
        * 	trace(p + ":" + target[p]);
        *	// output : a:1
        *	// output : b:2
        *	// output : c:[object Object]
        * }
        */
        this.gfnObjectCopyProperties = function(tarobject, srcobject)
        {
        	if (tarobject && srcobject)
        	{
        		var p, value;

        		for (p in srcobject)
        		{
        			if (srcobject.hasOwnProperty(p))
        			{
        				value = srcobject[p];
        				tarobject[p] = value;
        			}
        		}
        	}
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.RichTextEditor_onload,this);
            this.addEventHandler("onclick",this.RichTextEditor_onclick,this);
            this.addEventHandler("onclose",this.RichTextEditor_onclose,this);
            this.addEventHandler("onsize",this.RichTextEditor_onsize,this);
            this.addEventHandler("ontimer",this.RichTextEditor_ontimer,this);
            this.div_tableLayout.addEventHandler("onsetfocus",this.div_tableLayout_onsetfocus,this);
            this.div_tableLayout.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_tableLayout.form.grd_tableLayout.addEventHandler("onmousemove",this.tableLayout_onmousemove,this);
            this.div_tableLayout.form.div_selected.form.grd_tableLayout.addEventHandler("oncellclick",this.div_tableLayout_div_selected_grd_tableLayout_oncellclick,this);
            this.div_tableLayout.form.div_selected.form.grd_tableLayout.addEventHandler("onmousemove",this.tableLayout_onmousemove,this);
            this.div_tableLayout.form.btn_close.addEventHandler("onclick",this.div_tableLayout_btn_close_onclick,this);
            this.div_tableLayout.form.btn_template0.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_tableLayout.form.btn_template2.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_tableLayout.form.btn_template3.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_tableLayout.form.btn_template1.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_tableLayout.form.btn_template5.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_tableLayout.form.btn_template4.addEventHandler("onclick",this.pasteTableTemplate_onclick,this);
            this.div_fontsize.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_fontsize.form.grd_font.addEventHandler("oncellclick",this.div_fontsize_grd_font_oncellclick,this);
            this.div_font.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_font.form.grd_font.addEventHandler("oncellclick",this.div_font_grd_font_oncellclick,this);
            this.div_tableBoderRange.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_tableBoderRange.form.grd_tableBoderRange.addEventHandler("oncellclick",this.div_tableBoderRange_grd_tableBoderRange_oncellclick,this);
            this.div_tableBoderHeight.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_tableBoderHeight.form.grd_tableBoderHeight.addEventHandler("oncellclick",this.div_tableBoderHeight_grd_tableBoderHeight_oncellclick,this);
            this.div_template.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_template.form.sta_template0.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template1.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template2.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template3.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template7.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template6.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template5.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_template.form.sta_template4.addEventHandler("onclick",this.pasteTemplate_onclick,this);
            this.div_blockquote.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_blockquote.form.sta_blockquote0.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote1.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote2.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote3.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote4.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote5.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote6.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote7.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote8.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote9.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote10.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote11.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote12.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote13.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_blockquote.form.sta_blockquote14.addEventHandler("onclick",this.blockquote_onclick,this);
            this.div_char.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_char.form.grd_char.addEventHandler("oncellclick",this.div_char_grd_char_oncellclick,this);
            this.div_char.form.grd_char.addEventHandler("onmousemove",this.div_char_grd_char_onmousemove,this);
            this.div_char.form.sta_char.addEventHandler("onclick",this.div_char_sta_char_onclick,this);
            this.div_color.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_link.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_link.form.edt_link.addEventHandler("onkeydown",this.div_link_edt_link_onkeydown,this);
            this.div_link.form.btn_apply.addEventHandler("onclick",this.div_link_btn_apply_onclick,this);
            this.div_link.form.btn_close.addEventHandler("onclick",this.div_link_btn_close_onclick,this);
            this.div_editImage.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_editImage.form.edt_width.addEventHandler("onchanged",this.div_editImage_edt_width_onchanged,this);
            this.div_editImage.form.chk_ratio.addEventHandler("onchanged",this.div_editImage_chk_ratio_onchanged,this);
            this.div_editImage.form.edt_height.addEventHandler("onchanged",this.div_editImage_edt_height_onchanged,this);
            this.div_editImage.form.btn_reset.addEventHandler("onclick",this.div_editImage_btn_reset_onclick,this);
            this.div_editImage.form.spn_borderWidth.addEventHandler("onchanged",this.div_editImage_spn_borderWidth_onspin,this);
            this.div_editImage.form.spn_borderWidth.addEventHandler("onspin",this.div_editImage_spn_borderWidth_onspin,this);
            this.div_editImage.form.cmb_borderStyle.addEventHandler("onitemchanged",this.div_editImage_cmb_borderStyle_onitemchanged,this);
            this.div_editImage.form.btn_none.addEventHandler("onclick",this.div_editImage_btn_align_onclick,this);
            this.div_editImage.form.btn_left.addEventHandler("onclick",this.div_editImage_btn_align_onclick,this);
            this.div_editImage.form.btn_right.addEventHandler("onclick",this.div_editImage_btn_align_onclick,this);
            this.div_highlight.addEventHandler("onkillfocus",this.div_onkillfocus,this);
            this.div_highlight.form.grd_highlight.addEventHandler("oncellclick",this.div_highlight_grd_highlight_oncellclick,this);
            this.div_toolbar.addEventHandler("onmouseenter",this.div_toolbar_onmouseenter,this);
            this.div_toolbar.form.btn_template.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_highlight.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_left.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_center.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_right.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_full.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_indentout.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_indentin.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_numberlist.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_marklist.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_linkdel.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_link.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_bkcolor.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_color.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_bold.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_italic.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_underline.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_strikechar.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_specialchar.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_layoutTable.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_font.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_fontsize.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_merge.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_resetMerge.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_insertRowAbove.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_insertRowBelow.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_insertColLeft.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_insertColRight.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_deleteRow.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_deleteCol.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_tablebgcolor.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_tablebdcolor.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_tablebdheight.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_tablebdrange.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_editTable.addEventHandler("onclick",this.div_toolbar_btn_editTable_onclick,this);
            this.div_toolbar.form.btn_image.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_blockquote.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_verticaltop.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_verticalmiddle.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.div_toolbar.form.btn_verticalbottom.addEventHandler("onclick",this.toolbarButton_onclick,this);
            this.web_editor.addEventHandler("onloadcompleted",this.web_editor_onloadcompleted,this);
            this.web_editor.addEventHandler("onusernotify",this.web_editor_onusernotify,this);
            this.div_mode.form.btn_edit.addEventHandler("onclick",this.div_mode_btn_edit_onclick,this);
            this.div_mode.form.btn_src.addEventHandler("onclick",this.div_mode_btn_src_onclick,this);
            this.fileUpTrans.addEventHandler("onerror",this.fileUpTrans_onerror,this);
            this.fileUpTrans.addEventHandler("onprogress",this.fileUpTrans_onprogress,this);
            this.fileUpTrans.addEventHandler("onsuccess",this.fileUpTrans_onsuccess,this);
            this.fileDlg.addEventHandler("onclose",this.fileDlg_onclose,this);
        };
        this.loadIncludeScript("richtexteditor.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
