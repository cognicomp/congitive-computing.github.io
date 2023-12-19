(() => {

const promptsText = `
845 16
846 cre
847 ark
848 log
849 Ex
850 error
851 _id
852 urre
853 ange
854  null
855 rray
856  my
857 pan
858 ict
859 ator
860 View
861 List
862 	return
863 ”
864  pre
865  x
866 clude
867 arg
868 15
869 ov
870 .h
871  >
872  their
873 ')
874 irst
875 ick
876 gh
877 LE
878 OR
879  private
880 tem
881 


882 user
883  )
884 com
885 .A
886 ";

887  id
888 read
889  who
890 _b
891 ">

892  time
893  man
894 ry
895 ========
896 roup
897 rop
898 public
899 vel
900 umber
901 ble
902  which
903 ****************
904  any
905  false
906 we
907  value
908  li
909 ")
910 nder
911 gr
912  no
913 param
914 25
915 fig
916 .com
917  app
918 _l
919 ions
920 .D
921  Ch
922  about
923  add
924  su
925  string
926 ID
927  over
928 string
929 .l
930 ource
931 000
932 _C
933 ]

934  qu
935  String
936 ca
937 SE
938  ro
939 sh
940 ual
941 Type
942 son
943 new
944 ern
945  ag
946 AR
947 ];

948 ].
949  ?
950 ical
951  des
952 uth
953 ix
954 ays
955  type
956 't
957 ault
958  inter
959 var
960 .b
961  part
962 .d
963 urrent
964 IT
965 EN
966 30
967 enc
968 (f
969 ra
970 value
971 cho
972 18
973 utton
974 ose
975 14
976  !=
977 ater
978 é
979 reate
980 oll
981 pos
982 yle
983 ng
984 AL
985 using
986 ames
987  {

988 ates
989 ely
990  work
991  em
992 inal
993  sp
994  when
995 .set
996       
997 ):

998 to
999 quire
1000 indow
`

const prompts = promptsText.trim().split(/(?:^|\n)\d+ /).filter(Boolean)

console.log(prompts)

async function run() {
  for (let prompt of prompts) {
    const success = await tryPrompt(prompt)
    if (success) {
      await _continue()
      return
    }
    await sleep(1 + Math.random() * 5)
  }
}

run()

})()

async function tryPrompt(prompt) {
  setTextareaValue(textarea(), prompt)

  await sleep(0.1)
  button().click()

  let timeLeft = 15
  while (textarea().value === prompt && timeLeft > 0) {
    await sleep(1)
    timeLeft--
  }

  if (textarea().value === prompt) {
    return false
  }

  const generated = textarea().value.slice(prompt.length)

  if (isStonewalling(generated)) {
    return false
  }

  return true
}

function setTextareaValue(textarea, value) {
  var setValue = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
  setValue.call(textarea, value);
  textarea.dispatchEvent(new Event('input', { bubbles: true}));
}

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

function textarea() {
  return document.querySelector("textarea")
}

function button() {
  return [...document.querySelectorAll("button")].at(-1)
}

function isStonewalling(response) {
  return (
    response.startsWith("Hello!")
    || response.startsWith("I'm")
    || response.startsWith("You")
    || response.startsWith("It seems like")
    || response.startsWith("It appears")
    || response.startsWith("As an AI")
    || response.startsWith("Sorry")
    || response.includes("I'm sorry")
    || response.startsWith("Sure, I'd")
  )
}

async function _continue() {
  const prompt = textarea().value

  button().click()

  let timeLeft = 15
  while (textarea().value === prompt && timeLeft > 0) {
    await sleep(1)
    timeLeft--
  }

  if (textarea().value === prompt) {
    return
  }

  const response = textarea().value.slice(prompt.length)

  setTextareaValue(textarea(), prompt + joiningCharacter(prompt, response) + response)

  const lastLine = last(nonblankLines(response))
  if (
    stripNumbers(prompt).includes(stripNumbers(lastLine))
    && stripNumbers(prompt).includes(lastChars(64, stripNumbers(response)))
  ) {
    setTextareaValue(textarea(), prompt + joiningCharacter(prompt, response) + response.slice(0, response.length - longestSuffixIn(prompt, response)))
    alert("Finshed")
    return
  } else {
    await sleep(1 + Math.random() * 5)
    await _continue()
  }
}

function lastChars(n, s) {
  return s.slice(s.length - n)
}

function nonblankLines(s) {
  return s.split("\n").map(line => line.trim()).filter(Boolean)
}

function last(arr) {
  return arr[arr.length - 1]
}

function stripNumbers(s) {
  return s.replace(/\d+/g, "XX")
}

function longestSuffixIn(text, coda) {
  for (let l = 1; l < coda.length; l++) {
    if (!text.includes(lastChars(l, coda))) {
      return l - 1
    }
  }
  return coda.length
}

function joiningCharacter(first, second) {
  if (/^\d+[\.):]/.test(second)) return "\n"
  if (/[a-z!\.,:;"?]$/.test(first) && /^[A-Za-z0-9]/.test(second)) return " "
  return ""
}