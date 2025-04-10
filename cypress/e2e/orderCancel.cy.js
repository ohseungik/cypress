/**
 * @description
 * Domeggook Mobile Web 구매취소 접수
 */

describe('OrderCancel', () => {
    beforeEach(() => {
        if(!Cypress.env('ORDER_NO')) {
            throw new Error('Cypress 환경 변수가 설정되지 않았습니다. cypress.config.js 파일을 확인하세요.');
        }
    });

    it("구매 취소", () => {
        // 1. 주문 상세 페이지로 이동
        cy.visit("/buy/order/detail?no=" + Cypress.env('ORDER_NO')); 

        // 2. 아이디와 비밀번호 입력한다.
        cy.get('input[name="id"]').type(Cypress.env('BUYER_ID')); // ID 입력
        cy.get('input[name="password"]').type(Cypress.env('BUYER_SECRET')); // 비밀번호 입력

        // 3. 로그인 버튼을 클릭한다.
        cy.get('#lLoginBtn').click();

        // 4. 구매 취소 버튼 클릭
        cy.get('.buyDetailButtonBorder .buttonBox .ant-btn.custom-close-btn')
        .contains('구매취소하기')
        .click({ force: true });

        // 5. 구매 취소 사유 입력
        cy.get('.textAreaModalContent textarea')
        .type('Cypress 구매 취소 테스트'); // 사유 입력
        
        // 6. 접수 버튼 클릭
        cy.get('.textAreaModalContent .textAreaButtonBorder .buttonBox .ant-btn.custom-ok-btn')
        .contains('접수')
        .click({ force: true });
    })


});
