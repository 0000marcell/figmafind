function exists {
  EXISTS="true"
  rm -rf ./figma/tmp-error
  cat ./figma/DATA | figmafind -t FRAME -n $1 2> ./figma/tmp-error 1> /dev/null
  if [ ! -z "$(< ./figma/tmp-error)" ]; then
    EXISTS="false"
  fi
}

exists ACCOUNT-V2-ADDRESS
if [ "$EXISTS" == "true" ]; then
  echo "exists!"
fi
