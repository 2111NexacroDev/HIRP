(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("color");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_color", this);
            obj._setContents("<ColumnInfo><Column id=\"COLOR_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COLOR_VAL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"COLOR_ID\">1</Col><Col id=\"COLOR_VAL\">#FFD8D8</Col></Row><Row><Col id=\"COLOR_ID\">2</Col><Col id=\"COLOR_VAL\">#FAE0D4</Col></Row><Row><Col id=\"COLOR_ID\">3</Col><Col id=\"COLOR_VAL\">#FAECC5</Col></Row><Row><Col id=\"COLOR_ID\">4</Col><Col id=\"COLOR_VAL\">#FAF4C0</Col></Row><Row><Col id=\"COLOR_ID\">5</Col><Col id=\"COLOR_VAL\">#E4F7BA</Col></Row><Row><Col id=\"COLOR_ID\">6</Col><Col id=\"COLOR_VAL\">#CEFBC9</Col></Row><Row><Col id=\"COLOR_ID\">7</Col><Col id=\"COLOR_VAL\">#D4F4FA</Col></Row><Row><Col id=\"COLOR_ID\">8</Col><Col id=\"COLOR_VAL\">#D9E5FF</Col></Row><Row><Col id=\"COLOR_ID\">9</Col><Col id=\"COLOR_VAL\">#DAD9FF</Col></Row><Row><Col id=\"COLOR_ID\">10</Col><Col id=\"COLOR_VAL\">#E8D9FF</Col></Row><Row><Col id=\"COLOR_ID\">11</Col><Col id=\"COLOR_VAL\">#FFD9FA</Col></Row><Row><Col id=\"COLOR_ID\">12</Col><Col id=\"COLOR_VAL\">#FFD9EC</Col></Row><Row><Col id=\"COLOR_ID\">13</Col><Col id=\"COLOR_VAL\">#FFA7A7</Col></Row><Row><Col id=\"COLOR_ID\">14</Col><Col id=\"COLOR_VAL\">#FFC19E</Col></Row><Row><Col id=\"COLOR_ID\">15</Col><Col id=\"COLOR_VAL\">#FFE08C</Col></Row><Row><Col id=\"COLOR_ID\">16</Col><Col id=\"COLOR_VAL\">#FAED7D</Col></Row><Row><Col id=\"COLOR_ID\">17</Col><Col id=\"COLOR_VAL\">#CEF279</Col></Row><Row><Col id=\"COLOR_ID\">18</Col><Col id=\"COLOR_VAL\">#B7F0B1</Col></Row><Row><Col id=\"COLOR_ID\">19</Col><Col id=\"COLOR_VAL\">#B2EBF4</Col></Row><Row><Col id=\"COLOR_ID\">20</Col><Col id=\"COLOR_VAL\">#B2CCFF</Col></Row><Row><Col id=\"COLOR_ID\">21</Col><Col id=\"COLOR_VAL\">#B5B2FF</Col></Row><Row><Col id=\"COLOR_ID\">22</Col><Col id=\"COLOR_VAL\">#D1B2FF</Col></Row><Row><Col id=\"COLOR_ID\">23</Col><Col id=\"COLOR_VAL\">#FFB2F5</Col></Row><Row><Col id=\"COLOR_ID\">24</Col><Col id=\"COLOR_VAL\">#FFB2D9</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","146","170","88","70",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Button00");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("color.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	var nX = 100;
        	var nY = 100;
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = new Button("btn_color" + i, nX, nY, 30, 30);
        		this.addChild("btn_color" + i, objBtn);
        		objBtn.set_background(this.ds_color.getColumn(i, "COLOR_VAL"));
        		objBtn.setEventHandler("onclick", this.btn_color_onclick, this);
        		objBtn.show();
        		nX += 29;
        		if(i ==  11){
        			nX = 100;
        			nY += 29;
        		}
        	}
        };

        this.btn_color_onclick = function(obj, e)
        {
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = this.components["btn_color" + i];
        		var bStatus = objBtn.getSelectStatus();
        		if(bStatus){
        			objBtn.setSelectStatus(false);
        			objBtn.set_border("");
        			break;
        		}
        	}
        	obj.setSelectStatus(true);
        	obj.set_border("2px solid red")

        	trace("컬러: " + obj.background);
        }

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
        };
        this.loadIncludeScript("color.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
