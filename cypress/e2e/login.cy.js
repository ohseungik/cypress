/**
 * @description
 * Domeggook Mobile Web 로그인
 */

describe('Login', () => {
  it('일반 로그인', () => {
    // 1. 로그인 페이지로 이동한다.
    cy.visit("/login"); 

    // 2. 아이디와 비밀번호 입력한다.
    cy.get('input[name="id"]').type(Cypress.env('BUYER_ID')); 
    cy.get('input[name="password"]').type(Cypress.env('BUYER_SECRET')); 

    // 3. 로그인 버튼을 클릭한다.
    cy.get('#lLoginBtn').click();

    // 4. 로그인 성공 여부 확인
    cy.url().should('include', '/main'); 

    // 5. 로그아웃 한다.
    cy.visit("/logout"); 

    // 6. 로그아웃 성공 여부 확인
    cy.url().should('include', '/main'); 
  });
});