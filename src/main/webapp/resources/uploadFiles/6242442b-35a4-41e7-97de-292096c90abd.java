package ncs.MemberList.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class NcsMemberDAO {

private DataSource ds; // DataSource ds 는 아파치톰캣이 제공하는 DBCP(DB Connection Pool) 이다.

private Connection conn;

private PreparedStatement pstmt;

private ResultSet rs;

public NcsMemberDAO() {

try {

Context initContext = new InitialContext();

Context envContext = (Context)initContext.lookup("java:/comp/env");

ds = (DataSource)envContext.lookup("jdbc/myoracle");

} catch (NamingException e) {

e.printStackTrace();

}

}

private void close() {

try {

if(rs != null) {rs.close(); rs=null;}

if(pstmt != null) {pstmt.close(); pstmt=null;}

if(conn != null) {conn.close(); conn=null;}

} catch(SQLException e) {

e.printStackTrace();

}

}

// *** (요구사항4) int memberRegister(MemberVO mvo) throws SQLException 메소드를 생성하시오 *** //
public int memberRegister(MemberVO mvo) throws SQLException {
	int result = 0;
	
}
//*** (요구사항8) ***
//
//가입된 모든 회원정보가 보여지도록 ncs.memberList.model.NcsMemberDAO 클래스에서 메소드를 생성하는데 그 형태는 List<MemberVO> memberVOList() throws SQLException; 으로 한다.

public List<MemberVO> memberVOList() throws SQLException {
	ArrayList<MemberVO> memberVOList;
	try {
		conn = ds.getConnection();
		String sql = " select USERID, USERNAME, BIRTHDAY, GENDER " +
		" from ncstest_member";
		pstmt = conn.prepareStatement(sql);
		rs = pstmt.executeQuery();
		int ncst = 0;
		while(rs.next()) {
		ncst++;
		if(ncst==1)
		memberVOList = new ArrayList<MemberVO>();
		
		String userId = rs.getString("USERID");
		String userName = rs.getString("USERNAME");
		String birthday = rs.getString("BIRTHDAY");
		String gender = rs.getString("GENDER");
		MemberVO memberVO = new MemberVO();
		
		memberVO.setUserId(userId);
		memberVO.setUserName(userName);
		memberVO.setBirthday(birthday);
		memberVO.setGender(Integer.parseInt(gender));
		memberVOList.add(memberVO);
		}
		} finally {
		close();
		}
		return memberVOList;
		}

}
}