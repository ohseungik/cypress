const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: ""
  },
  env: {
    // Cypress 환경 변수 설정
    BUYER_ID: "",  // 구매자 ID
    BUYER_SECRET: "", // 구매자 비밀번호
    SELLER_ID: "",  // 판매자 ID
    SELLER_SECRET: "", // 판매자 비밀번호
    ITEM_NO: "", // 결제할 상품 번호
    PAY_METHOD: "", // 결제 방법 (POINT or EMONEY)
    ORDER_NO: "", // 주문 번호
  }
});
