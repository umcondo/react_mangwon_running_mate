# 리액트로 만드는 망원러닝메이트!

[배포](https://umcondo.github.io/react_mangwon_running_mate/)

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

7/5
배포

8/7
버그 수정 및 image lazy loading 추가

8/8
image lazy loading 롤백, git rebase -i drop option 이용 커밋삭제

---

## 이슈

```
- 이슈 : 결과페이지의 코스데이터가 갱신되지 않음
- 진단 : resultIndex가 0부터 시작해서 falsy처리됨
- 해결 : resultIndex가 아니라 resultIndex + 1이 truthy인지 확인하는 로직으로 변경

// resultIndex가 0일 경우 로컬스토리지에서 값을 가져오므로 +1을 해주었다.
  if (resultIndex + 1) {
    localStorage.setItem("resultIndex", resultIndex);
  } else {
    resultIndex = +localStorage.getItem("resultIndex");
  }
```

```
- 이슈 : 배포 후 로딩 애니메이션 및 결과페이지의 모바일 반응형 css가 오류
- 진단 : css import의 순서가 잘못 되었다.
- 해결 : result.css보다 mobile.css를 뒤에 import하여 해결했다.
```

```
- 이슈 : 카카오톡 공유 시 결과페이지가 아니라 서비스 자체가 공유된다.
```
