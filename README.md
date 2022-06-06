# 리액트로 만드는 망원러닝메이트!

5/17
첫페이지, 질문페이지 구현

5/18
결과페이지, 공유하기 모달창 구현

5/19
kakaomap 구현

5/28
update design, result animation 구현

6/6
벨로퍼트 1~15챕터를 바탕으로 첫페이지, 질문페이지, 결과페이지 및 컴포넌트 리팩토링

---

## 이슈

- 이슈 : 결과페이지의 코스데이터가 갱신되지 않음
- 진단 : resultIndex가 0부터 시작해서 falsy처리됨
- 해결 : resultIndex가 아니라 resultIndex + 1이 truthy인지 확인하는 로직으로 변경

```
// resultIndex가 0일 경우 로컬스토리지에서 값을 가져오므로 +1을 해주었다.
  if (resultIndex + 1) {
    localStorage.setItem("resultIndex", resultIndex);
  } else {
    resultIndex = +localStorage.getItem("resultIndex");
  }
```
