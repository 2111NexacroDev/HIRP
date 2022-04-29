(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
            "Form" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"font" : nexacro.FontObject("12px Gulim"),
            						"color" : nexacro.ColorObject("#555555"),
            						"border" : nexacro.BorderObject("0px none")
            					},
            					"contents" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"titleicon" :
            			{
            				"parent" :
            				{
            					"titlebar" :
            					{
            						"parent" :
            						{
            							"MainFrame" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/titlebar_icon_nexacro17.ico')")
            									}
            								}
            							}
            						}
            					},
            					"TitleBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/img_TF_TitleIcon.png')"),
            								"textPadding" : nexacro.PaddingObject("0px 0px 0px 10px")
            							}
            						}
            					}
            				}
            			},
            			"Button" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #c2c2c2")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #a0a0a0")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #a0a0a0")
            					},
            					"pushed" :
            					{
            					},
            					"selected" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#bbbbbb"),
            						"border" : nexacro.BorderObject("1px solid #d9d9d9")
            					}
            				}
            			},
            			"FileDownload" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #c2c2c2")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #a0a0a0")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #a0a0a0")
            					},
            					"pushed" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#bbbbbb"),
            						"border" : nexacro.BorderObject("1px solid #d9d9d9")
            					}
            				}
            			},
            			"ButtonControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none")
            					}
            				}
            			},
            			"fileuploaditem" :
            			{
            				"parent" :
            				{
            					"FileUpload" :
            					{
            						"self" :
            						{
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"fileuploaditembutton" :
            			{
            				"parent" :
            				{
            					"fileuploaditem" :
            					{
            						"parent" :
            						{
            							"FileUpload" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #c2c2c2"),
            										"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            									},
            									"mouseover" :
            									{
            										"border" : nexacro.BorderObject("1px solid #a0a0a0")
            									},
            									"focused" :
            									{
            										"border" : nexacro.BorderObject("1px solid #a0a0a0")
            									},
            									"pushed" :
            									{
            									},
            									"selected" :
            									{
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#bbbbbb"),
            										"border" : nexacro.BorderObject("1px solid #d9d9d9")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"Calendar" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"CalendarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"dropbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calendar.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calendar_D.png')")
            							}
            						}
            					},
            					"CalendarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calendar.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calendar_D.png')")
            							}
            						}
            					},
            					"Combo" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("1px 2px 0px 0px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_O.png')")
            							},
            							"focused" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_P.png')")
            							},
            							"selected" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_P.png')")
            							},
            							"disabled" :
            							{
            							}
            						}
            					},
            					"ComboControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("1px 2px 0px 0px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_O.png')")
            							},
            							"focused" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_P.png')")
            							},
            							"selected" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop_P.png')")
            							},
            							"disabled" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"calendarspinupbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_D.png')")
            							}
            						}
            					},
            					"CalendarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"calendarspindownbutton" :
            			{
            				"parent" :
            				{
            					"Calendar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_D.png')")
            							}
            						}
            					},
            					"CalendarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"CheckBox" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box.png')"),
            						"textPadding" : nexacro.PaddingObject("0px 0px 0px 6px")
            					},
            					"mouseover" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_O.png')")
            					},
            					"readonly" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_D.png')")
            					},
            					"selected" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_S.png')")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999"),
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_D.png')")
            					},
            					"disabled_selected" :
            					{
            						"color" : nexacro.ColorObject("#999999"),
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_DS.png')")
            					}
            				}
            			},
            			"CheckBoxControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box.png')"),
            						"textPadding" : nexacro.PaddingObject("0px 0px 0px 6px")
            					},
            					"mouseover" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_O.png')")
            					},
            					"readonly" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_D.png')")
            					},
            					"selected" :
            					{
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_S.png')")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999"),
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_D.png')")
            					},
            					"disabled_selected" :
            					{
            						"color" : nexacro.ColorObject("#999999"),
            						"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Box_DS.png')")
            					}
            				}
            			},
            			"Combo" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"ComboControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"combolist" :
            			{
            				"parent" :
            				{
            					"Combo" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"color" : nexacro.ColorObject("#555555"),
            								"border" : nexacro.BorderObject("1px solid #b1b1b1")
            							}
            						}
            					},
            					"ComboControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"color" : nexacro.ColorObject("#555555"),
            								"border" : nexacro.BorderObject("1px solid #b1b1b1")
            							}
            						}
            					},
            					"cellcombo" :
            					{
            						"parent" :
            						{
            							"GridCellControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"font" : nexacro.FontObject("12px Gulim"),
            										"color" : nexacro.ColorObject("#555555")
            									}
            								}
            							},
            							"ListViewCellControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"font" : nexacro.FontObject("12px Gulim"),
            										"color" : nexacro.ColorObject("#555555")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"Edit" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"fileuploaditemedit" :
            			{
            				"parent" :
            				{
            					"fileuploaditem" :
            					{
            						"parent" :
            						{
            							"FileUpload" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            										"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            									},
            									"mouseover" :
            									{
            										"border" : nexacro.BorderObject("1px solid #5a86cd")
            									},
            									"focused" :
            									{
            										"border" : nexacro.BorderObject("1px solid #5a86cd")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#999999")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"EditControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            					},
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"MaskEdit" :
            			{
            				"self" :
            				{
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"MaskEditControl" :
            			{
            				"self" :
            				{
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("0px none"),
            						"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            					}
            				}
            			},
            			"TextArea" :
            			{
            				"self" :
            				{
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"padding" : nexacro.PaddingObject("9px 9px 9px 9px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"TextAreaControl" :
            			{
            				"self" :
            				{
            					"nulltext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"padding" : nexacro.PaddingObject("9px 9px 9px 9px")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"Spin" :
            			{
            				"self" :
            				{
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					},
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"readonly" :
            					{
            					},
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"SpinControl" :
            			{
            				"self" :
            				{
            					"invalidtext" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"Grid" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("2px solid #125dae, 1px solid #b7b1b2, 1px solid #b7b1b2, 1px solid #b7b1b2")
            					}
            				}
            			},
            			"cell" :
            			{
            				"parent" :
            				{
            					"row" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"Grid" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"font" : nexacro.FontObject("bold 12px Gulim"),
            												"color" : nexacro.ColorObject("#2f2f2f"),
            												"border" : nexacro.BorderObject("1px solid #cacaca"),
            												"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            											},
            											"disabled" :
            											{
            												"color" : nexacro.ColorObject("#999999")
            											}
            										}
            									}
            								}
            							},
            							"body" :
            							{
            								"parent" :
            								{
            									"Grid" :
            									{
            										"self" :
            										{
            											"disabled_selected" :
            											{
            											},
            											"enabled" :
            											{
            												"color" : nexacro.ColorObject("#666666"),
            												"border" : nexacro.BorderObject("1px solid #dbdee2"),
            												"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            											},
            											"mouseover" :
            											{
            											},
            											"selected" :
            											{
            											},
            											"disabled" :
            											{
            												"color" : nexacro.ColorObject("#999999")
            											},
            											"blinked" :
            											{
            												"color" : nexacro.ColorObject("#ffffff")
            											}
            										}
            									}
            								}
            							},
            							"summary" :
            							{
            								"parent" :
            								{
            									"Grid" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"font" : nexacro.FontObject("bold 12px Gulim"),
            												"color" : nexacro.ColorObject("#333333"),
            												"border" : nexacro.BorderObject("1px solid #c8c1c2")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"body" :
            					{
            						"parent" :
            						{
            							"ListView" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"disabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"readonly" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"focused" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"mouseover" :
            									{
            										"border" : nexacro.BorderObject("1px solid #c4c9cf")
            									}
            								}
            							}
            						}
            					},
            					"detail" :
            					{
            						"parent" :
            						{
            							"ListView" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"disabled" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"readonly" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"focused" :
            									{
            										"border" : nexacro.BorderObject("1px solid #dbdee2"),
            										"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            									},
            									"mouseover" :
            									{
            										"border" : nexacro.BorderObject("1px solid #c4c9cf")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"subcell" :
            			{
            				"parent" :
            				{
            					"cell" :
            					{
            						"parent" :
            						{
            							"row" :
            							{
            								"parent" :
            								{
            									"body" :
            									{
            										"parent" :
            										{
            											"Grid" :
            											{
            												"self" :
            												{
            													"enabled" :
            													{
            														"color" : nexacro.ColorObject("#666666"),
            														"border" : nexacro.BorderObject("1px solid #dbdee2"),
            														"padding" : nexacro.PaddingObject("4px 4px 4px 4px")
            													},
            													"mouseover" :
            													{
            													},
            													"disabled" :
            													{
            														"color" : nexacro.ColorObject("#999999")
            													},
            													"selected" :
            													{
            													},
            													"blinked" :
            													{
            														"color" : nexacro.ColorObject("#ffffff")
            													}
            												}
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"selection" :
            			{
            				"parent" :
            				{
            					"body" :
            					{
            						"parent" :
            						{
            							"Grid" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"border" : nexacro.BorderObject("2px solid #125dae")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"summary" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #c8c1c2, 0px none, 0px none, 0px none")
            							}
            						}
            					}
            				}
            			},
            			"hscrollbar" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #b1b1b1, 0px none, 0px none, 0px none")
            							}
            						}
            					}
            				}
            			},
            			"vscrollbar" :
            			{
            				"parent" :
            				{
            					"Grid" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 0px none, 1px solid #b1b1b1")
            							}
            						}
            					}
            				}
            			},
            			"cellbutton" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"color" : nexacro.ColorObject("#555555"),
            								"border" : nexacro.BorderObject("1px solid #c2c2c2")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a0a0a0")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a0a0a0")
            							},
            							"pushed" :
            							{
            							},
            							"selected" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#bbbbbb"),
            								"border" : nexacro.BorderObject("1px solid #d9d9d9")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"color" : nexacro.ColorObject("#555555"),
            								"border" : nexacro.BorderObject("1px solid #c2c2c2")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a0a0a0")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a0a0a0")
            							},
            							"pushed" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#bbbbbb"),
            								"border" : nexacro.BorderObject("1px solid #d9d9d9")
            							}
            						}
            					}
            				}
            			},
            			"cellcalendar" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					}
            				}
            			},
            			"cellcheckbox" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					}
            				}
            			},
            			"cellcombo" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					}
            				}
            			},
            			"listboxitem" :
            			{
            				"parent" :
            				{
            					"combolist" :
            					{
            						"parent" :
            						{
            							"cellcombo" :
            							{
            								"parent" :
            								{
            									"GridCellControl" :
            									{
            										"self" :
            										{
            											"mouseover" :
            											{
            											}
            										}
            									},
            									"ListViewCellControl" :
            									{
            										"self" :
            										{
            											"mouseover" :
            											{
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"ListBox" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#555555"),
            								"padding" : nexacro.PaddingObject("2px 9px 3px 9px")
            							},
            							"mouseover" :
            							{
            							},
            							"selected" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							},
            							"disabled" :
            							{
            							}
            						}
            					},
            					"ListBoxControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#555555"),
            								"padding" : nexacro.PaddingObject("2px 9px 3px 9px")
            							},
            							"mouseover" :
            							{
            							},
            							"selected" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							},
            							"disabled" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"celledit" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            								"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            								"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"cellexpandbutton" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Grdexpand.png')")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Grdexpand.png')")
            							}
            						}
            					}
            				}
            			},
            			"cellmaskedit" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            								"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            								"padding" : nexacro.PaddingObject("1px 9px 0px 9px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #5a86cd")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"cellprogressbar" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					}
            				}
            			},
            			"celltextarea" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					},
            					"ListViewCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim")
            							}
            						}
            					}
            				}
            			},
            			"treeitemtext" :
            			{
            				"parent" :
            				{
            					"celltreeitem" :
            					{
            						"parent" :
            						{
            							"GridCellControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"font" : nexacro.FontObject("12px Gulim"),
            										"color" : nexacro.ColorObject("#666666")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#999999")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"treeitembutton" :
            			{
            				"parent" :
            				{
            					"celltreeitem" :
            					{
            						"parent" :
            						{
            							"GridCellControl" :
            							{
            								"self" :
            								{
            									"expand" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Treeexpand.png')")
            									},
            									"collapse" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Treecollapse.png')")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"treeitemimage" :
            			{
            				"parent" :
            				{
            					"celltreeitem" :
            					{
            						"parent" :
            						{
            							"GridCellControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/img_WF_Treeitem.png')")
            									},
            									"expand" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/img_WF_Treeexpand.png')")
            									},
            									"collapse" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/img_WF_Treecollapse.png')")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"celltreeline" :
            			{
            				"parent" :
            				{
            					"GridCellControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px dotted #909090")
            							}
            						}
            					}
            				}
            			},
            			"groupboxcontents" :
            			{
            				"parent" :
            				{
            					"GroupBox" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #d6d4d5")
            							},
            							"disabled" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"groupboxtitle" :
            			{
            				"parent" :
            				{
            					"GroupBox" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 4px 0px 4px")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"ImageViewer" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"disabled" :
            					{
            					}
            				}
            			},
            			"imagetext" :
            			{
            				"parent" :
            				{
            					"ImageViewer" :
            					{
            						"self" :
            						{
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"ListBox" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"disabled" :
            					{
            					}
            				}
            			},
            			"ListBoxControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"disabled" :
            					{
            					}
            				}
            			},
            			"Menu" :
            			{
            				"self" :
            				{
            					"disabled" :
            					{
            					}
            				}
            			},
            			"prevbutton" :
            			{
            				"parent" :
            				{
            					"Menu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 5px 0px 15px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menuprev.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menuprev_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menuprev_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menuprev_D.png')")
            							}
            						}
            					},
            					"menupopupmenu" :
            					{
            						"parent" :
            						{
            							"Menu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev.png')")
            									},
            									"mouseover" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev_O.png')")
            									},
            									"disabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev_D.png')")
            									}
            								}
            							}
            						}
            					},
            					"PopupMenu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2_D.png')")
            							}
            						}
            					},
            					"PopupMenuControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenuprev2_D.png')")
            							}
            						}
            					},
            					"Tab" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 8px 10px 0px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabprev.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabprev_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabprev_D.png')")
            							}
            						}
            					},
            					"head" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"padding" : nexacro.PaddingObject("0px 0px 0px 10px"),
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calprev.png')")
            									},
            									"mouseover" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calprev_O.png')")
            									},
            									"pushed" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calprev_O.png')")
            									},
            									"disabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calprev.png')")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"nextbutton" :
            			{
            				"parent" :
            				{
            					"Menu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 15px 0px 5px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menunext.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menunext_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menunext_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Menunext_D.png')")
            							}
            						}
            					},
            					"menupopupmenu" :
            					{
            						"parent" :
            						{
            							"Menu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext.png')")
            									},
            									"mouseover" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext_O.png')")
            									},
            									"disabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext_D.png')")
            									}
            								}
            							}
            						}
            					},
            					"PopupMenu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2_D.png')")
            							}
            						}
            					},
            					"PopupMenuControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popmenunext2_D.png')")
            							}
            						}
            					},
            					"Tab" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 0px 10px 8px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabnext.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabnext_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabnext_D.png')")
            							}
            						}
            					},
            					"head" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"padding" : nexacro.PaddingObject("0px 10px 0px 0px"),
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calnext.png')")
            									},
            									"mouseover" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calnext_O.png')")
            									},
            									"pushed" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calnext_O.png')")
            									},
            									"disabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calnext.png')")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"menuitem" :
            			{
            				"parent" :
            				{
            					"Menu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("bold 13px Gulim"),
            								"color" : nexacro.ColorObject("#ffffff"),
            								"padding" : nexacro.PaddingObject("0px 30px 0px 30px")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#c7d4e2")
            							},
            							"mouseover" :
            							{
            							},
            							"selected" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"menupopupmenu" :
            			{
            				"parent" :
            				{
            					"Menu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"font" : nexacro.FontObject("12px Gulim"),
            								"color" : nexacro.ColorObject("#555555"),
            								"border" : nexacro.BorderObject("1px solid #034389")
            							}
            						}
            					}
            				}
            			},
            			"popupmenuitem" :
            			{
            				"parent" :
            				{
            					"menupopupmenu" :
            					{
            						"parent" :
            						{
            							"Menu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"color" : nexacro.ColorObject("#c3e0ff"),
            										"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #2065ae, 0px none"),
            										"padding" : nexacro.PaddingObject("3px 8px 3px 8px")
            									},
            									"mouseover" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"focused" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"selected" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#2665af")
            									}
            								}
            							}
            						}
            					},
            					"PopupMenu" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#555555"),
            								"padding" : nexacro.PaddingObject("3px 9px 3px 9px")
            							},
            							"selected" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							},
            							"mouseover" :
            							{
            							},
            							"focused" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					},
            					"PopupMenuControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#555555"),
            								"padding" : nexacro.PaddingObject("3px 9px 3px 9px")
            							},
            							"selected" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							},
            							"mouseover" :
            							{
            							},
            							"focused" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"popupmenuitemcheckbox" :
            			{
            				"parent" :
            				{
            					"popupmenuitem" :
            					{
            						"parent" :
            						{
            							"menupopupmenu" :
            							{
            								"parent" :
            								{
            									"Menu" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 7px 0px 0px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Popupmenu_O.png')")
            											},
            											"mouseover" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/chk_WF_Popupmenu_O.png')")
            											}
            										}
            									}
            								}
            							},
            							"PopupMenu" :
            							{
            								"self" :
            								{
            									"mouseover" :
            									{
            									},
            									"disabled" :
            									{
            									}
            								}
            							},
            							"PopupMenuControl" :
            							{
            								"self" :
            								{
            									"mouseover" :
            									{
            									},
            									"disabled" :
            									{
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"popupmenuitemtext" :
            			{
            				"parent" :
            				{
            					"popupmenuitem" :
            					{
            						"parent" :
            						{
            							"menupopupmenu" :
            							{
            								"parent" :
            								{
            									"Menu" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"color" : nexacro.ColorObject("#c3e0ff"),
            												"padding" : nexacro.PaddingObject("0px 20px 0px 0px")
            											},
            											"mouseover" :
            											{
            												"color" : nexacro.ColorObject("#ffffff")
            											},
            											"disabled" :
            											{
            												"color" : nexacro.ColorObject("#2665af")
            											}
            										}
            									}
            								}
            							},
            							"PopupMenu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"padding" : nexacro.PaddingObject("2px 10px 1px 4px")
            									}
            								}
            							},
            							"PopupMenuControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"padding" : nexacro.PaddingObject("2px 10px 1px 4px")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"popupmenuitemhotkeytext" :
            			{
            				"parent" :
            				{
            					"popupmenuitem" :
            					{
            						"parent" :
            						{
            							"menupopupmenu" :
            							{
            								"parent" :
            								{
            									"Menu" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"color" : nexacro.ColorObject("#6d95cc"),
            												"padding" : nexacro.PaddingObject("0px 7px 0px 0px")
            											},
            											"mouseover" :
            											{
            												"color" : nexacro.ColorObject("#ffffff")
            											},
            											"disabled" :
            											{
            												"color" : nexacro.ColorObject("#4577b9")
            											}
            										}
            									}
            								}
            							},
            							"PopupMenu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"color" : nexacro.ColorObject("#aaaaaa"),
            										"padding" : nexacro.PaddingObject("0px 7px 0px 0px")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#4577b9")
            									}
            								}
            							},
            							"PopupMenuControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"color" : nexacro.ColorObject("#aaaaaa"),
            										"padding" : nexacro.PaddingObject("0px 7px 0px 0px")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#4577b9")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"popupmenuitemexpandimage" :
            			{
            				"parent" :
            				{
            					"popupmenuitem" :
            					{
            						"parent" :
            						{
            							"menupopupmenu" :
            							{
            								"parent" :
            								{
            									"Menu" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 0px 2px 0px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popupexpand.png')")
            											}
            										}
            									}
            								}
            							},
            							"PopupMenu" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popupexpand2.png')")
            									}
            								}
            							},
            							"PopupMenuControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Popupexpand2.png')")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"Plugin" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					}
            				}
            			},
            			"PluginControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					}
            				}
            			},
            			"PopupMenu" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"font" : nexacro.FontObject("12px Gulim"),
            						"color" : nexacro.ColorObject("#555555"),
            						"border" : nexacro.BorderObject("1px solid #b5b5b5")
            					}
            				}
            			},
            			"PopupMenuControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"font" : nexacro.FontObject("12px Gulim"),
            						"color" : nexacro.ColorObject("#555555"),
            						"border" : nexacro.BorderObject("1px solid #b5b5b5")
            					}
            				}
            			},
            			"ProgressBar" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #aeaeae, 1px solid #d2d0d1, 1px solid #d2d0d1, 1px solid #d2d0d1")
            					}
            				}
            			},
            			"ProgressBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #aeaeae, 1px solid #d2d0d1, 1px solid #d2d0d1, 1px solid #d2d0d1")
            					}
            				}
            			},
            			"progressbaritem" :
            			{
            				"parent" :
            				{
            					"ProgressBar" :
            					{
            						"self" :
            						{
            							"disabled" :
            							{
            							}
            						}
            					},
            					"ProgressBarControl" :
            					{
            						"self" :
            						{
            							"disabled" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"progressbartext" :
            			{
            				"parent" :
            				{
            					"ProgressBar" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							}
            						}
            					},
            					"ProgressBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#ffffff")
            							}
            						}
            					}
            				}
            			},
            			"radioitem" :
            			{
            				"parent" :
            				{
            					"Radio" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/rdo_WF_Radio.png')"),
            								"textPadding" : nexacro.PaddingObject("0px 0px 0px 5px")
            							},
            							"selected" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/rdo_WF_Radio_S.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/rdo_WF_Radio_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/rdo_WF_Radio_D.png')")
            							},
            							"disabled_selected" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/rdo_WF_Radio_DS.png')")
            							}
            						}
            					}
            				}
            			},
            			"Sketch" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					},
            					"disabled" :
            					{
            					}
            				}
            			},
            			"spinedit" :
            			{
            				"parent" :
            				{
            					"Spin" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 3px 0px 3px")
            							},
            							"disabled" :
            							{
            								"padding" : nexacro.PaddingObject("1px 2px 0px 9px")
            							}
            						}
            					},
            					"yearspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"font" : nexacro.FontObject("bold 14px Tahoma"),
            												"color" : nexacro.ColorObject("#ffffff")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"monthspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"font" : nexacro.FontObject("bold 14px Tahoma"),
            												"color" : nexacro.ColorObject("#ffffff")
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"spinupbutton" :
            			{
            				"parent" :
            				{
            					"Spin" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("1px 0px 0px 0px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spinup_D.png')")
            							}
            						}
            					},
            					"yearspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 10px 0px 5px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup.png')")
            											},
            											"mouseover" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_O.png')")
            											},
            											"pushed" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_O.png')")
            											},
            											"disabled" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_D.png')")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"monthspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 10px 0px 5px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup.png')")
            											},
            											"mouseover" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_O.png')")
            											},
            											"pushed" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_O.png')")
            											},
            											"disabled" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspinup_D.png')")
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"spindownbutton" :
            			{
            				"parent" :
            				{
            					"Spin" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("0px 0px 2px 0px"),
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_O.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_P.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Spindown_D.png')")
            							}
            						}
            					},
            					"yearspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 10px 0px 5px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown.png')")
            											},
            											"mouseover" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_O.png')")
            											},
            											"pushed" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_O.png')")
            											},
            											"disabled" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_D.png')")
            											}
            										}
            									}
            								}
            							}
            						}
            					},
            					"monthspin" :
            					{
            						"parent" :
            						{
            							"head" :
            							{
            								"parent" :
            								{
            									"DatePickerControl" :
            									{
            										"self" :
            										{
            											"enabled" :
            											{
            												"padding" : nexacro.PaddingObject("0px 10px 0px 5px"),
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown.png')")
            											},
            											"mouseover" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_O.png')")
            											},
            											"pushed" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_O.png')")
            											},
            											"disabled" :
            											{
            												"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Calspindown_D.png')")
            											}
            										}
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"Static" :
            			{
            				"self" :
            				{
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"StaticControl" :
            			{
            				"self" :
            				{
            					"disabled" :
            					{
            						"color" : nexacro.ColorObject("#999999")
            					}
            				}
            			},
            			"WebBrowser" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					}
            				}
            			},
            			"WebBrowserControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5")
            					}
            				}
            			},
            			"tabpage" :
            			{
            				"parent" :
            				{
            					"Tab" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #cfcfcf, 0px none, 0px none, 0px none")
            							}
            						}
            					}
            				}
            			},
            			"tabbuttonitem" :
            			{
            				"parent" :
            				{
            					"Tab" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"color" : nexacro.ColorObject("#333333"),
            								"border" : nexacro.BorderObject("1px solid #c7c7c7"),
            								"padding" : nexacro.PaddingObject("6px 10px 6px 10px")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #b1b1b1")
            							},
            							"focused" :
            							{
            								"color" : nexacro.ColorObject("#dee4ef")
            							},
            							"selected" :
            							{
            								"color" : nexacro.ColorObject("#dee4ef"),
            								"border" : nexacro.BorderObject("1px solid #1055a1")
            							},
            							"focused_selected" :
            							{
            								"color" : nexacro.ColorObject("#dee4ef"),
            								"border" : nexacro.BorderObject("1px solid #1055a1")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#ababab")
            							},
            							"disabled_selected" :
            							{
            								"border" : nexacro.BorderObject("1px solid #c7d4e2")
            							}
            						}
            					}
            				}
            			},
            			"tabbuttonitemtext" :
            			{
            				"parent" :
            				{
            					"tabbuttonitem" :
            					{
            						"parent" :
            						{
            							"Tab" :
            							{
            								"self" :
            								{
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#c8c8c8")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"extrabutton" :
            			{
            				"parent" :
            				{
            					"tabbuttonitem" :
            					{
            						"parent" :
            						{
            							"Tab" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"padding" : nexacro.PaddingObject("0px 0px 0px 20px"),
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabextra.png')")
            									},
            									"selected" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Tabextra_S.png'")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"head" :
            			{
            				"parent" :
            				{
            					"DatePickerControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"padding" : nexacro.PaddingObject("5px 0px 0px 0px")
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#cdcdcd")
            							}
            						}
            					}
            				}
            			},
            			"yearstatic" :
            			{
            				"parent" :
            				{
            					"head" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"font" : nexacro.FontObject("bold 14px Tahoma"),
            										"color" : nexacro.ColorObject("#ffffff"),
            										"padding" : nexacro.PaddingObject("0px 10px 0px 0px")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#c7d4e2")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"monthstatic" :
            			{
            				"parent" :
            				{
            					"head" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"font" : nexacro.FontObject("bold 14px Tahoma"),
            										"color" : nexacro.ColorObject("#ffffff"),
            										"padding" : nexacro.PaddingObject("0px 10px 0px 0px")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#c7d4e2")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"body" :
            			{
            				"parent" :
            				{
            					"DatePickerControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #125dae, 1px solid #697888, 1px solid #697888, 1px solid #697888")
            							},
            							"disabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #98a6b5")
            							}
            						}
            					},
            					"ListView" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"readonly" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"selected" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"weekband" :
            			{
            				"parent" :
            				{
            					"body" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"disabled" :
            									{
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"weekitem" :
            			{
            				"parent" :
            				{
            					"body" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"saturday" :
            									{
            										"color" : nexacro.ColorObject("#48afff")
            									},
            									"sunday" :
            									{
            										"color" : nexacro.ColorObject("#ff7986")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#c7d4e2")
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"dayitem" :
            			{
            				"parent" :
            				{
            					"body" :
            					{
            						"parent" :
            						{
            							"DatePickerControl" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"color" : nexacro.ColorObject("#333333")
            									},
            									"mouseover" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"focused" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"selected" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"today" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"saturday" :
            									{
            										"color" : nexacro.ColorObject("#269bee")
            									},
            									"mouseover_saturday" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"sunday" :
            									{
            										"color" : nexacro.ColorObject("#ff4c5e")
            									},
            									"mouseover_sunday" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"trailingday" :
            									{
            										"color" : nexacro.ColorObject("#989898")
            									},
            									"mouseover_trailingday" :
            									{
            										"color" : nexacro.ColorObject("#ffffff")
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#cdcdcd")
            									},
            									"disabled_selected" :
            									{
            									}
            								}
            							}
            						}
            					}
            				}
            			},
            			"VScrollBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #b1b1b1"),
            						"padding" : nexacro.PaddingObject("2px 2px 2px 2px")
            					}
            				}
            			},
            			"HScrollBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #b1b1b1"),
            						"padding" : nexacro.PaddingObject("2px 2px 2px 2px")
            					}
            				}
            			},
            			"incbutton" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vinc.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vinc_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vinc_D.png')")
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hinc.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hinc_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hinc_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"decbutton" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vdec.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vdec_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Vdec_D.png')")
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hdec.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hdec_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Hdec_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"trackbar" :
            			{
            				"parent" :
            				{
            					"VScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #c8c8c8")
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"selected" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a8a8a8")
            							},
            							"disabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #d8d8d8")
            							}
            						}
            					},
            					"HScrollBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #c8c8c8")
            							},
            							"pushed" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"selected" :
            							{
            								"border" : nexacro.BorderObject("1px solid #888888")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("1px solid #a8a8a8")
            							},
            							"disabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #d8d8d8")
            							}
            						}
            					},
            					"VScrollIndicatorControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("2px solid transparent")
            							},
            							"pushed" :
            							{
            							},
            							"mouseover" :
            							{
            							}
            						}
            					},
            					"HScrollIndicatorControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("2px solid transparent")
            							},
            							"pushed" :
            							{
            							},
            							"mouseover" :
            							{
            							}
            						}
            					}
            				}
            			},
            			"progressbar" :
            			{
            				"parent" :
            				{
            					"StatusBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("1px solid #afaeae, 1px solid #d2d0d0, 1px solid #d2d0d0, 1px solid #d2d0d0")
            							}
            						}
            					}
            				}
            			},
            			"resizegrip" :
            			{
            				"parent" :
            				{
            					"StatusBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL(\"theme://images/img_grip.png\")")
            							}
            						}
            					}
            				}
            			},
            			"TitleBarControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"font" : nexacro.FontObject("bold 12px Gulim"),
            						"color" : nexacro.ColorObject("#ffffff"),
            						"padding" : nexacro.PaddingObject("0px 0px 0px 10px")
            					}
            				}
            			},
            			"minbutton" :
            			{
            				"parent" :
            				{
            					"TitleBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Min.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Min_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Min_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"normalbutton" :
            			{
            				"parent" :
            				{
            					"TitleBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Normal.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Normal_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Normal_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"maxbutton" :
            			{
            				"parent" :
            				{
            					"TitleBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Max.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Max_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Max_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"closebutton" :
            			{
            				"parent" :
            				{
            					"TitleBarControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Close.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Close_O.png')")
            							},
            							"disabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_TF_Close_D.png')")
            							}
            						}
            					}
            				}
            			},
            			"StepControl" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"padding" : nexacro.PaddingObject("0px 0px 10px 0px")
            					}
            				}
            			},
            			"stepitem" :
            			{
            				"parent" :
            				{
            					"StepControl" :
            					{
            						"self" :
            						{
            							"enabled" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Stepitem.png')")
            							},
            							"mouseover" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Stepitem_S.png')")
            							},
            							"pushed" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Stepitem_S.png')")
            							},
            							"selected" :
            							{
            								"icon" : nexacro.UrlObject("URL('theme://images/btn_WF_Stepitem_S.png')")
            							}
            						}
            					}
            				}
            			},
            			"ListView" :
            			{
            				"self" :
            				{
            					"enabled" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"color" : nexacro.ColorObject("#666666")
            					},
            					"readonly" :
            					{
            						"border" : nexacro.BorderObject("1px solid #d5d5d5"),
            						"color" : nexacro.ColorObject("#666666")
            					},
            					"mouseover" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"focused" :
            					{
            						"border" : nexacro.BorderObject("1px solid #5a86cd")
            					},
            					"disabled" :
            					{
            					}
            				}
            			},
            			"detail" :
            			{
            				"parent" :
            				{
            					"ListView" :
            					{
            						"self" :
            						{
            							"readonly" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"focused" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"mouseover" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"enabled" :
            							{
            								"border" : nexacro.BorderObject("0px none, 0px none, 1px solid #dbdee2, 0px none"),
            								"font" : nexacro.FontObject("12px Gulim")
            							},
            							"selected" :
            							{
            							},
            							"disabled" :
            							{
            								"color" : nexacro.ColorObject("#999999")
            							}
            						}
            					}
            				}
            			},
            			"expandbar" :
            			{
            				"parent" :
            				{
            					"body" :
            					{
            						"parent" :
            						{
            							"ListView" :
            							{
            								"self" :
            								{
            									"enabled" :
            									{
            										"icon" : nexacro.UrlObject("URL('theme://images/cmb_WF_Drop.png')"),
            										"border" : nexacro.BorderObject("1px solid #c2c2c2")
            									},
            									"mouseover" :
            									{
            										"border" : nexacro.BorderObject("1px solid #a0a0a0")
            									},
            									"focused" :
            									{
            										"border" : nexacro.BorderObject("1px solid #a0a0a0")
            									},
            									"pushed" :
            									{
            									},
            									"selected" :
            									{
            									},
            									"disabled" :
            									{
            										"color" : nexacro.ColorObject("#bbbbbb"),
            										"border" : nexacro.BorderObject("1px solid #d9d9d9")
            									}
            								}
            							}
            						}
            					}
            				}
            			}
		},
		{
            "includeStatusMap" : true
		}
		);
		var imgcache = nexacro._getImageCacheMaps();
        imgcache[nexacro._getImageLocation("theme://images/titlebar_icon_nexacro17.ico")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calendar.png")] = { width:12, height:12 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calendar_D.png")] = { width:12, height:12 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spinup.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spinup_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spinup_P.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spinup_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spindown.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spindown_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spindown_P.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Spindown_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box_O.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box_D.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box_S.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box_DS.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/cmb_WF_Drop.png")] = { width:9, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/cmb_WF_Drop_O.png")] = { width:9, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/cmb_WF_Drop_P.png")] = { width:9, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Grdexpand.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Treeexpand.png")] = { width:9, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Treecollapse.png")] = { width:9, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Treeitem.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Treeexpand.png")] = { width:14, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Treecollapse.png")] = { width:14, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menuprev.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menuprev_O.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menuprev_D.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menunext.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menunext_O.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Menunext_D.png")] = { width:5, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Menu_O.png")] = { width:19, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev_O.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev_D.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext_O.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext_D.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Popupmenu_O.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popupexpand.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev2.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev2_O.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenuprev2_D.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext2.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext2_O.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popmenunext2_D.png")] = { width:11, height:6 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Box_F.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Popupexpand2.png")] = { width:4, height:7 };
        		imgcache[nexacro._getImageLocation("theme://images/rdo_WF_Radio.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/rdo_WF_Radio_S.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/rdo_WF_Radio_O.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/rdo_WF_Radio_D.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/rdo_WF_Radio_DS.png")] = { width:14, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabextra.png")] = { width:9, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabprev.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabprev_O.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabprev_D.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabnext.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabnext_O.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabnext_D.png")] = { width:6, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calprev.png")] = { width:6, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calprev_O.png")] = { width:6, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calnext.png")] = { width:6, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calnext_O.png")] = { width:6, height:9 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspinup.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspinup_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspinup_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspindown.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspindown_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Calspindown_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vinc.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vinc_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vinc_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vdec.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vdec_O.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Vdec_D.png")] = { width:5, height:3 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hinc.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hinc_O.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hinc_D.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hdec.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hdec_O.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Hdec_D.png")] = { width:3, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/img_grip.png")] = { width:11, height:11 };
        		imgcache[nexacro._getImageLocation("theme://images/img_TF_TitleIcon.png")] = { width:16, height:16 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Min.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Min_O.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Min_D.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Normal.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Normal_O.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Normal_D.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Max.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Max_O.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Max_D.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Close.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Close_O.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_TF_Close_D.png")] = { width:30, height:30 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Stepitem.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Stepitem_S.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/btn_WF_Tabextra_S.png")] = { width:8, height:8 };
        		imgcache[nexacro._getImageLocation("theme://images/chk_WF_Popupmenu.png")] = { width:13, height:13 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Grdimg.png")] = { width:12, height:14 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Htrackbar.png")] = { width:8, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Htrackbar_D.png")] = { width:8, height:5 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Menuimage.png")] = { width:210, height:50 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Menuitem2.png")] = { width:10, height:10 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Nexacro.png")] = { width:108, height:20 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Popupcheck.png")] = { width:7, height:7 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Popupcheck2.png")] = { width:7, height:7 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Vtrackbar.png")] = { width:5, height:8 };
        		imgcache[nexacro._getImageLocation("theme://images/img_WF_Vtrackbar_D.png")] = { width:5, height:8 };
        		imgcache[nexacro._getImageLocation("theme://images/mnu_WF_PopItemImg.png")] = { width:8, height:7 };
	};
}
)();
