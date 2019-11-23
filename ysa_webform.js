/* 
 *	YSA WEBFORM <https://github.com/yadieet/bbwa-misc>
 *   Copyright (C) 2018-2019  Yadieet SA <qts19bit@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>
 *
 */

(function ( $ ) {
	$.fn.ysa_webform = function( options ) {

		var THIS = this;

		//TODO; Textfield Criteria
		
		var excl_sym = "<i class='fas fa-exclamation-triangle'></i>";

		var defaults = {
			fields: [
				{ label: "label-1", type: "textfield", name: "name-1", maxlength: 10, size: 15, value: "value-1", tooltip: "tooltip-1", disabled: true, criteria: "text" },
				{ label: "label-2", type: "textfield", name: "name-2", maxlength: 15, size: 20, value: "value-2", tooltip: "tooltip-2", autocomplete: true, valuehints: "Circles in cirle", criteria: "number" },
				{ label: "label-3", type: "textfield", name: "name-3", maxlength: 20, size: 25, value: "value-3", tooltip: "tooltip-3", readonly: true },
				{ label: "label-4", type: "combobox", name: "name-4", 
					values: [ "option-1", "option-2", "option-3", "option-4", "option-5" ], 
					valuestexts: [ "Option 1", "Option 2", "Option 3", "Option 4", "Option 5" ], 
					selectedIndex: 2, tooltip: "tooltip-4"
				},
				{ label: "label-5",  type: "radio", name: "name-5", 
					values: [ "option-1", "option-2", "option-3", "option-4", "option-5" ], 
					valuestexts: [ "Option 1", "Option 2", "Option 3", "Option 4", "Option 5" ], 
					tooltips: [ "tooltip-5a", "tooltip-5b", "tooltip-5c", "tooltip-5d", "tooltip-5e" ],
					selectedIndex: 3, numrow: 2
				},
				{ label: "label-6",  type: "checkbox",name: "name-6",
					values: [ "valitem-1", "valitem-2", "valitem-3", "valitem-4", "valitem-5" ], 
					valuestexts: [ "ValueItem 1", "ValueItem 2", "ValueItem 3", "ValueItem 4", "ValueItem 5" ], 
					tooltips: [ "tooltip-6a", "tooltip-6b", "tooltip-6c", "tooltip-6d", "tooltip-6e" ],
					selectedindexs: [0, 2, 3] , numrow: 2
				},
				{ label: "label-7",  type: "htextfields", 
					names: [ "name-7a", "name-7b", "name-7c" ],
					maxlengths: [3, 4, 5],
					sizes: [2, 3, 4],
					values: ["", "006b", "0006c"],
					tooltips: ["tooltip-7a", "tooltip-7b", "tooltip-7c"],
					autocompletes: [true, true, true],
					readonlys: [false, true, true],
					valuehintss: ["xxx", "yyyy", "zzzzz"],
					criterias: ["text", "text", "text"],
					divider: "  -  "
				},
				{ label: "label-8", type: "datechooser", name: "name-8", value: "2018-02-28", tooltip: "tooltip-8", size: 9, buttontext: "<i class='far fa-caret-square-down'></i>" },
				{ label: "label-9",  type: "vtextfields", 
					names: [ "name-9a", "name-9b", "name-9c" ],
					maxlengths: [5, 4, 3],
					sizes: [4, 3, 2],
					values: ["", "006b", "0006c"],
					tooltips: ["tooltip-9a", "tooltip-9b", "tooltip-9c"],
					autocompletes: [true, true, true],
					readonlys: [false, true, true],
					valuehintss: ["xxx", "yyyy", "zzzzz"],
					criterias: ["text", "text", "text"],
					verspace: 5
				},
			],
			postURL: "/default/test_submit.php",
		};
		
		var settings = $.extend( {}, defaults, options );
		
		var form = $("<form method='post' action='" + settings.postURL + "'>");

		settings.fields.forEach(function(item,index) {
			var fieldDiv = $("<div class='field'>");
			fieldDiv.attr("id", item.name);
			
			switch (item.type)
			{
				case "textfield" :
					var fieldItem = $("<input>");
					fieldItem.attr("type", "text");
					fieldItem.attr("maxlength", item.maxlength);
					fieldItem.attr("size", item.size);
					fieldItem.attr("name", item.name);

					if( item.hasOwnProperty( "valuehints" ) )
						fieldItem.attr("placeholder", item.valuehints);
					if( item.hasOwnProperty( "tooltip" ) )
						fieldItem.attr("title", item.tooltip);
					if( item.hasOwnProperty( "value" ) )
						fieldItem.attr("value", item.value);
					//if( item.hasOwnProperty( "pattern" ) )
					//	fieldItem.attr("pattern", item.pattern);
					
					if( item.hasOwnProperty( "readonly" ) && item.readonly === true )
						fieldItem.attr("readonly", "readonly");
					if( item.hasOwnProperty( "autocomplete" ) )
					{
						if( item.autocomplete === true )
							fieldItem.attr("autocomplete", "on");
						else
							fieldItem.attr("autocomplete", "off");
					}
					if( item.hasOwnProperty( "disabled" ) && item.disabled === true )
						fieldItem.attr("disabled", "disabled");
					fieldDiv.append("<div class='label'>"+item.label+"</div>", fieldItem);
					fieldDiv.append(excl_sym);
				break;
					
				case "combobox" :
					var fieldItem = $("<select>");
					fieldItem.attr("name", item.name);
					item.values.forEach(function(value, i) {
						var option = $("<option>");
						option.attr("value", value);
						option.append(item.valuestexts[i]);
						fieldItem.append(option);
						if( item.hasOwnProperty( "selectedIndex" ) )
							fieldItem.val(item.values[item.selectedIndex]);
					});
					if( item.hasOwnProperty( "tooltip" ) )
						fieldItem.attr("title", item.tooltip);
					if( item.hasOwnProperty( "disabled" ) && item.disabled === true )
						fieldItem.attr("disabled", "disabled");
					fieldDiv.append("<div class='label'>"+item.label+"</div>", fieldItem);
					fieldDiv.append(excl_sym);
				break;
					
				case "radio" :
					//fieldDiv.addClass("multiItem");
					fieldDiv.append("<div class='label'>"+item.label+"</div>");
					var n = 0;
					var itemColDiv = $("<div class='itemColDiv multiItem'>");
					item.values.forEach(function(value, i) {
						if( n % item.numrow == 0 )
							itemColDiv = $("<div class='itemColDiv'>");
						var fieldItem = $("<input>");
						fieldItem.attr("name", item.name);
						fieldItem.attr("type", "radio");
						fieldItem.attr("value", value);
						if( item.hasOwnProperty( "tooltips" ) )
						{
							fieldItem.attr("title", item.tooltips[i]);
						}
						if( item.hasOwnProperty( "disabled" ) && item.disabled === true )
							fieldItem.attr("disabled", "disabled");
						itemColDiv.append(fieldItem, "<label for='"+value+"' >"+item.valuestexts[i]+"</label><br>");
						if( item.hasOwnProperty( "selectedIndex" ) && n == item.selectedIndex )
						{
							fieldItem.prop("checked", true);
						}
						fieldDiv.append(itemColDiv);
						n++;
					});
					fieldDiv.append(excl_sym);
				break;
					
				case "checkbox" :
					fieldDiv.append("<div class='label'>"+item.label+"</div>");
					var n = 0;
					var checkboxes = [];
					var itemColDiv = $("<div class='itemColDiv'>");
					item.values.forEach(function(value, i) {
						if( n % item.numrow == 0 )
							itemColDiv = $("<div class='itemColDiv'>");
						var fieldItem = $("<input>");
						fieldItem.attr("name", item.name);
						fieldItem.attr("type", "checkbox");
						fieldItem.attr("value", value);
						if( item.hasOwnProperty( "tooltips" ) )
						{
							fieldItem.attr("title", item.tooltips[i]);
						}
						if( item.hasOwnProperty( "disabled" ) && item.disabled === true )
							fieldItem.attr("disabled", "disabled");
						itemColDiv.append(fieldItem, "<label for='"+value+"' >"+item.valuestexts[i]+"</label><br>");
						checkboxes[n] = fieldItem;
						fieldDiv.append(itemColDiv);
						n++;
					});
					item.selectedindexs.forEach(function(value, i) {
						checkboxes[value].prop("checked", true);
					});
					fieldDiv.append(excl_sym);
				break;
				
				case "htextfields" :
					fieldDiv.append("<div class='label'>"+item.label+"</div>");
					var n = 0;
					var itemRowDiv = $("<div class='span'>");
					item.names.forEach(function(value, i) {
						var fieldItem = $("<input>");
						fieldItem.attr("name", value);
						fieldItem.attr("type", "text");
						fieldItem.attr("maxlength", item.maxlengths[n]);
						fieldItem.attr("size", item.sizes[n]);

						if( item.hasOwnProperty( "valuehintss" ) )
							fieldItem.attr("placeholder", item.valuehintss[n]);
						if( item.hasOwnProperty( "tooltips" ) )
							fieldItem.attr("title", item.tooltips[n]);
						if( item.hasOwnProperty( "values" ) )
							fieldItem.attr("value", item.values[n]);
						//if( item.hasOwnProperty( "pattern" ) )
						//	fieldItem.attr("pattern", item.pattern);
						
						if( item.hasOwnProperty( "readonlys" ) && item.readonlys[n] === true )
							fieldItem.attr("readonly", "readonly");
						if( item.hasOwnProperty( "autocompletes" ) )
						{
							if( item.autocompletes[n] === true )
								fieldItem.attr("autocomplete", "on");
							else
								fieldItem.attr("autocomplete", "off");
						}
						if( item.hasOwnProperty( "disableds" ) && item.disableds[n] === true )
							fieldItem.attr("disabled", "disabled");
							
						n++;
						
						itemRowDiv.append(fieldItem);
						
						if( n < item.names.length )
						{
							if( item.hasOwnProperty( "divider" ) )
								itemRowDiv.append("<i class='text'>"+item.divider+"</i>");
							else
								itemRowDiv.append( " " );
						}

					});
					fieldDiv.append(itemRowDiv);
					fieldDiv.append(excl_sym);
				break;
				
				case "vtextfields" :
					fieldDiv.append("<div class='label'>"+item.label+"</div>");
					var n = 0;
					var itemColDiv = $("<div class='itemColDiv'>");
					item.names.forEach(function(value, i) {
						var fieldItem = $("<input>");
						fieldItem.attr("name", value);
						fieldItem.attr("type", "text");
						fieldItem.attr("maxlength", item.maxlengths[n]);
						fieldItem.attr("size", item.sizes[n]);

						if( item.hasOwnProperty( "valuehintss" ) )
							fieldItem.attr("placeholder", item.valuehintss[n]);
						if( item.hasOwnProperty( "tooltips" ) )
							fieldItem.attr("title", item.tooltips[n]);
						if( item.hasOwnProperty( "values" ) )
							fieldItem.attr("value", item.values[n]);
						//if( item.hasOwnProperty( "pattern" ) )
						//	fieldItem.attr("pattern", item.pattern);
						
						if( item.hasOwnProperty( "readonlys" ) && item.readonlys[n] === true )
							fieldItem.attr("readonly", "readonly");
						if( item.hasOwnProperty( "autocompletes" ) )
						{
							if( item.autocompletes[n] === true )
								fieldItem.attr("autocomplete", "on");
							else
								fieldItem.attr("autocomplete", "off");
						}
						if( item.hasOwnProperty( "disableds" ) && item.disableds[n] === true )
							fieldItem.attr("disabled", "disabled");
							
						n++;
						
						itemColDiv.append(fieldItem, "<br>");
						
						if( n < item.names.length )
						{
							if( item.hasOwnProperty( "verspace" ) )
								itemColDiv.append("<div class='verspace-"+item.verspace+"'</div>");
							else
								itemColDiv.append( " " );
						}

					});
					fieldDiv.append(itemColDiv);
					fieldDiv.append(excl_sym);
				break;

				case "datechooser" :
					var fieldItem = $("<input class='datechooser'>");
					fieldItem.attr("type", "text");
					fieldItem.attr("maxlength", 10);
					fieldItem.attr("size", item.size);
					fieldItem.attr("name", item.name);

					if( item.hasOwnProperty( "tooltip" ) )
						fieldItem.attr("title", item.tooltip);
					if( item.hasOwnProperty( "value" ) )
					{
						if( !isNaN(new Date(item.value)) )
							fieldItem.attr("value", item.value);
					}
					//if( item.hasOwnProperty( "pattern" ) )
					//	fieldItem.attr("pattern", item.pattern);
					
					if( item.hasOwnProperty( "readonly" ) && item.readonly === true )
						fieldItem.attr("readonly", "readonly");
					if( item.hasOwnProperty( "autocomplete" ) )
					{
						if( item.autocomplete === true )
							fieldItem.attr("autocomplete", "on");
						else
							fieldItem.attr("autocomplete", "off");
					}
					if( item.hasOwnProperty( "disabled" ) && item.disabled === true )
						fieldItem.attr("disabled", "disabled");

					fieldDiv.append("<div class='label'>"+item.label+"</div>", fieldItem);
					fieldItem.datepicker({});
					
					
					if( item.hasOwnProperty( "buttontext" ) )
						fieldDiv.append("<button type='button' class='dtc'>"+item.buttontext+"</button>");
						
					fieldDiv.append(excl_sym);
				break;

				default:
					fieldDiv.attr("id", "error");
					fieldDiv.append("<div class='label'>{ ERROR }</div>", "{ ERROR }");	
					
			}

			form.append(fieldDiv);
		});

		THIS.append(form);
		
		var fbg = "#e0ffe0";
		
		$(".ysa-webform input[type=text]").focus(function(){
			$(this).parent(".field").css("background-color", fbg);
			$(this).css("border", "1px solid #080");
			$(this).parent(".itemRowDiv").parent(".field").css("background-color", fbg);
		});
		$(".ysa-webform input[type=text]").blur(function(){
			$(this).parent(".field").css("background-color","inherit");
			$(this).css("border", "1px solid #ccc");
			$(this).parent(".itemRowDiv").parent(".field").css("background-color","inherit");
		});
		
		$(".ysa-webform select").focus(function(){
			$(this).parent(".field").css("background-color", fbg);
		});
		$(".ysa-webform select").blur(function(){
			$(this).parent(".field").css("background-color","inherit");
		});
		
		$(".ysa-webform input[type=radio]").focus(function(){
			$(this).parent(".itemColDiv").parent(".field").css("background-color", fbg);
		});
		$(".ysa-webform input[type=radio]").blur(function(){
			$(this).parent(".itemColDiv").parent(".field").css("background", "inherit");
		});
		
		$(".ysa-webform input[type=checkbox]").focus(function(){
			$(this).parent(".itemColDiv").parent(".field").css("background-color", fbg);
		});
		$(".ysa-webform input[type=checkbox]").blur(function(){
			$(this).parent(".itemColDiv").parent(".field").css("background", "inherit");
		});
		
		$(".ysa-webform .itemColDiv label").click(function(){
			var elm = $(this).prev();
			if( elm.attr("type")=="radio" )
				elm.prop("checked", true);
			else
			{
				var val = elm.prop("checked");
				elm.prop("checked", !val);
			}
			elm.focus();
		});
		
		$(".ysa-webform form button.dtc").click(function(){
			$(this).prev().datepicker("show");
		});
		
		return THIS;
    };	

}( jQuery ));
