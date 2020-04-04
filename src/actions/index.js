import { MainService } from "services/MainService";
import { Urls } from "infrastructure/Helper/urls";
import { ShowSnack } from "infrastructure/Helper/Showsnack";

export const openDialog = (store, value) => {
  const dialogOpen = value;
  store.setState({ dialogOpen });
};

export const addAttribute = (store, attribute) => {
  if  (attribute.Id==="") attribute.Id = 0;
  
  
  const attributes = [...store.state.attributes, attribute];
  
  store.setState({ attributes });

  openDialog(store, false);
  
}

export const resetAttribute = (store) => {
  
  
  store.setState({ removedAttribute :[] , attributes : [] });

}
export const removeAttribute = (store, attribute) => {
  //درصورتی که جزو موارد ثبت شده قبلی بود آن را در لیست حذف شده ها قرار بده
  if (attribute.Id !==0){
    const removedAttribute =  [...store.state.removedAttribute , attribute];

    store.setState({  removedAttribute });
  }
  const attributes = store.state.attributes.filter(at => at !== attribute);

  store.setState({  attributes });
  
  
  // openDialog(store,false);
}

export const selectSegment = (store, segment) => {
  store.setState({ formValues: {} });
  store.setState({ issueType: undefined });
  store.setState({ segment });
}

export const getSegment = (store) => {

  return store.state.segment[0];
}

export const setIssueType = (store, issueType) => {

  store.setState({ formValues: {} });
  store.setState({ issueType });
}

export const addState = (store, name, value) => {
  console.log('name: ', name);
  console.log('value: ', value);
  var formValues = store.state.formValues;
  formValues[name] = value;
  
  store.setState({ formValues });

}


export const submitIssue = (store) => {
  console.log('store.state.formValues: ', store.state.formValues);

  const propertys = Object.entries(store.state.formValues).map(([key, value]) => {
    
    return {
      PropertyTypeId: key,
      Value: value
    }
  })
  
  const issueModel = {

    TypeId: store.state.issueType[0].Id,
    SegmentId: getSegment(store).Id,
    Values: propertys

  }
  
  MainService.New(Urls.Issue.New, JSON.stringify(issueModel)).then(response =>
    ShowSnack.Success("درخواست شما با موفقیت ثبت شد")
  );

}