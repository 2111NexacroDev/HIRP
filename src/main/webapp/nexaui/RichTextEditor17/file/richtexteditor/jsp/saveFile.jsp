<%
/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/ 
%>
 
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@ page import="org.apache.commons.fileupload.FileItemFactory"%>
<%@ page import="org.apache.commons.fileupload.FileUploadException"%>
<%@ page import="org.apache.commons.fileupload.FileItem"%>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@ page import="org.apache.commons.io.FilenameUtils"%>
<%@ page import="org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException"%>
<%@ page import="org.apache.commons.fileupload.FileUploadBase.FileSizeLimitExceededException"%>

<%@ page import="javax.servlet.http.HttpServlet"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.http.HttpServletResponse"%>
<%@ page import="javax.servlet.ServletException"%>
<%@ page import="java.io.IOException"%>
<%@ page import="java.io.File"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="java.util.Date"%>
<%@ page import="java.util.TimeZone"%>
<%@ page import="java.text.DateFormat"%>
<%@ page import="java.text.SimpleDateFormat"%>

<%@ page import="com.nexacro17.xapi.data.*"%>
<%@ page import="com.nexacro17.xapi.tx.*"%>

<%
	PlatformData resData = new PlatformData();
	VariableList resVarList = resData.getVariableList();
	
	//Check that we have a file upload request
	boolean isMultipart = ServletFileUpload.isMultipartContent(request);
	
	if (isMultipart) 
	{
		String contextRealPath = request.getSession().getServletContext().getRealPath("/");
		String path = request.getParameter("path");
		String savePath = contextRealPath + path;
		String maxSize = request.getParameter("maxSize");
		String maxTotalSize = request.getParameter("maxTotalSize");
		
		if ( maxSize == null )
		{
			maxSize = "-1";
		}
		if ( maxTotalSize == null )
		{
			maxTotalSize = "-1";
		}
		
		Long lMaxSize = Long.parseLong(maxSize);		
		Long lMaxTotalSize = Long.parseLong(maxTotalSize);
		
		// Create a factory for disk-based file items
		DiskFileItemFactory factory = new DiskFileItemFactory();
		
		// Sets the size threshold beyond which files are written directly to disk
		factory.setSizeThreshold(4096);
		
		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);
	
		// Specifies the character encoding to be used when reading the headers of individual part
		upload.setHeaderEncoding("utf-8");
		
		// Set overall request size constraint
		upload.setSizeMax(lMaxTotalSize);
		
		// Sets the maximum allowed size of a single uploaded file
		upload.setFileSizeMax(lMaxSize); 
		
		try 
		{
			File filePath = new File(savePath); 
			if (!filePath.exists()) 
			{
				filePath.mkdirs();
			}
	
			// Sets the directory used to temporarily store files that are larger than the configured size threshold
			factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
	
			// Parse the request
			List items = upload.parseRequest(request);
			Iterator iter = items.iterator();
			
			DataSet ds = new DataSet("ds_output");
			ds.addColumn(new ColumnHeader("filename", DataTypes.STRING));
			ds.addColumn(new ColumnHeader("savefilename", DataTypes.STRING));
			ds.addColumn(new ColumnHeader("filesize", DataTypes.INT));
			
			// Parse the request
			while (iter.hasNext()) 
			{
				FileItem item = (FileItem) iter.next();
				System.out.println(">>>>> item:"+item);
				if (item.isFormField()) 
				{
					String name = item.getFieldName();
					String encoding = upload.getHeaderEncoding();
                    String value = item.getString(encoding);

	    			//input dataset 확인
                    //String value = item.getString();
	    			
	    			if(name == "inputDatasets") {
	    				//TODO
	    				//문자열(xml or ssv)을 Dataset으로 변환 후 업무로직에 사용할 것.
	    				continue;
	    			}
    			
    				if (value == null || value.equals(""))
					{
						continue;
					}
					else
					{
						File f = new File(savePath + File.separator, value);
						
						if (f.exists()) 
						{
							//System.out.println("f==>"+f);
							f.delete();
						}
					}
				}
				else	// Process a file upload
				{
					// filename on the client
					String fieldName = item.getFieldName();
					String fileName = item.getName();
					long fileSize = item.getSize();
					System.out.println(">>>>> fileName:"+fileName + "   fieldName:" + fieldName + "   fileSize:" + fileSize);
					
					if (fileName == null || fileName.equals(""))
					{
						continue;
					}
					else
					{
						fileName = FilenameUtils.getName(fileName);
						
				    	System.out.println("--->fileName:"+fileName);
						
                        //============================= save file name =============================    
                        Date date = new Date();
                        TimeZone gmtTime = TimeZone.getTimeZone("GMT");
                        DateFormat gmtFormat = new SimpleDateFormat("yyyyMMdd");
                        gmtFormat.setTimeZone(gmtTime);
                        
                        int seq = 0;
                        String rename       = FilenameUtils.getBaseName(fileName) + "_" + gmtFormat.format(date);
                        String ext          = FilenameUtils.getExtension(fileName);
                        String saveFileName = rename + "_" + seq + "." + ext;
                        //==========================================================================					
				        
						File uploadedFile = new File(filePath + File.separator, saveFileName);

                        while (!uploadedFile.createNewFile()) 
                        {
                            seq++;
                            saveFileName = rename + "_" + seq + "." + ext;
                            uploadedFile = new File(uploadedFile.getParent(), saveFileName);
                        }
						
						item.write(uploadedFile);
						item.delete();
						
						int row = ds.newRow();
						ds.set(row, "filename", fileName);
						ds.set(row, "savefilename", saveFileName);
						ds.set(row, "filesize", fileSize);
					}
				}
			}
			
			resData.addDataSet(ds);
			resVarList.add("ErrorCode", 0);
			resVarList.add("ErrorMsg", "SUCC");
		}
		catch (FileSizeLimitExceededException e)
		{
			resVarList.add("ErrorCode", 1);
			resVarList.add("ErrorMsg", "FileSizeLimitExceededException");
		}
		catch (SizeLimitExceededException e)
		{
			resVarList.add("ErrorCode", 1);
			resVarList.add("ErrorMsg", "SizeLimitExceeded");
		}
		catch (FileUploadException e) 
		{
			resVarList.add("ErrorCode", -1);
			resVarList.add("ErrorMsg", e);
			e.printStackTrace();
		}
		catch (Exception e) 
		{
			resVarList.add("ErrorCode", -1);
			resVarList.add("ErrorMsg", e);
			e.printStackTrace();
		}
	}
	else
	{
		resVarList.add("ErrorCode", -1);
		resVarList.add("ErrorMsg", "Invalid Request");
	}
	
	HttpPlatformResponse res = new HttpPlatformResponse(response);
	res.setData(resData);
	res.sendData();
%>
