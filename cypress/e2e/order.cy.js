/**
 * @description
 * Domeggook Mobile Web 테스트 상품 결제 ( 포인트 or 이머니 )
 */

describe('Order', () => {
    beforeEach(() => {
        if(Cypress.env('BUYER_ID') === "" || Cypress.env('BUYER_SECRET') === "" || Cypress.env('ITEM_NO') === "" || Cypress.env('PAY_METHOD') === "") {
            throw new Error('Cypress 환경 변수가 설정되지 않았습니다. cypress.config.js 파일을 확인하세요.');
        }

        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('Script error.')) {
                return false; // Cypress가 이 예외를 무시하도록 설정
            }
        });
    });

    it('주문 (상품옵션 랜덤)', () => {
        // 1. 로그인 페이지로 이동한다.
        cy.visit("/login"); 

        // 2. 아이디와 비밀번호 입력한다.
        cy.get('input[name="id"]').type(Cypress.env('BUYER_ID')); // ID 입력
        cy.get('input[name="password"]').type(Cypress.env('BUYER_SECRET')); // 비밀번호 입력

        // 3. 로그인 버튼을 클릭한다.
        cy.get('#lLoginBtn').click();

        // 4. 로그인 성공 여부 확인
        cy.url().should('include', '/main'); 

        // 5. 상품 상세 페이지로 이동한다.
        cy.visit(`/${Cypress.env("ITEM_NO")}`);

        cy.get('body').then(($body) => {
            // 6. 첫 번째 구매하기 버튼 클릭
            cy.get('button[data-action="open"]').click({ force: true }); 

            // 7. 옵션 선택 버튼이 있으면 클릭 (랜덤 선택)
            if ($body.find('button[data-action="option"]').length > 0) {
                cy.get('button[data-action="option"]').then(($btn) => {
                    cy.wrap($btn).click({ force: true }); 

                    cy.get('button.lBtnOpt').each(($optionButton) => {
                        cy.wrap($optionButton).click({ force: true }); 
                        cy.get('ol[data-depth]').find('li').not(':has(.end)').then(($options) => { // 판매종료 제외
                            const randomIndex = Math.floor(Math.random() * $options.length); 
                            cy.wrap($options[randomIndex]).click({ force: true }); 
                        });
                    });
                });
            }

            // 8. 배송비 결제 방법이 있으면 클릭 (랜덤 선택)
            if ($body.find('.lPayDeli .pSelectUIMenu li').length > 0) {
                cy.get('.lPayDeli .pSelectUIMenu li').then(($options) => {
                    const randomIndex = Math.floor(Math.random() * $options.length); 
                    cy.wrap($options[randomIndex]).find('button.pSelectUIBtn').click({ force: true }); 
                });
            }
        });

        // 7. 두 번째 구매하기 버튼 클릭
        cy.get('button[data-action="buy"]').click({ force: true }); 

        // 8. 결제 수단 선택 (포인트 or 이머니)
        const payMethod = Cypress.env('PAY_METHOD'); // 결제 방법 (POINT or EMONEY)

        if (payMethod === 'POINT') {
            cy.get('button[onclick*="pointAllUse"]').first().click(); // 포인트 전액사용 버튼 클릭
        } else {
            cy.get('button[onclick*="emoneyAllUse"]').first().click(); // 이머니 전액사용 버튼 클릭
        }

        // 9. 결제 버튼 클릭
        cy.get('#orderBtnBuy').click();

        // 10. 주문 성공 여부 확인
        cy.url().should('include', '/order/result');

        // 11. 주문목록 페이지 이동
        cy.visit("/buy/order/list"); 
    })
})